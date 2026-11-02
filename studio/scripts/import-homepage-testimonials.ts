import {writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {isDeepStrictEqual} from 'node:util'
import {getCliClient} from 'sanity/cli'
import {defaultTestimonials} from '../../lib/testimonials'

// Dry run: sanity exec scripts/import-homepage-testimonials.ts --with-user-token
// Apply only this approved field: append -- --apply. Existing drafts are never published.
const client = getCliClient({apiVersion: '2026-09-11'}).withConfig({useCdn: false})
const testimonials = defaultTestimonials.map((testimonial) => ({_type: 'testimonial', ...testimonial}))

async function run() {
  const documents = await client.fetch<Array<{
    _id: string; _rev: string; testimonials?: unknown; [key: string]: unknown
  }>>('*[_type == "homepage" && !(_id in path("versions.**"))]', {}, {perspective: 'raw'})
  const published = documents.filter((document) => !document._id.startsWith('drafts.'))
  if (published.length !== 1) throw new Error('Expected exactly one published Homepage.')
  const homepage = published[0]
  const draft = documents.find((document) => document._id === `drafts.${homepage._id}`)
  if (draft && !isDeepStrictEqual(draft.testimonials, homepage.testimonials) &&
      !isDeepStrictEqual(draft.testimonials, testimonials)) {
    throw new Error('Homepage has independent testimonial draft edits. No content was changed.')
  }
  const pending = [homepage, ...(draft ? [draft] : [])].filter(
    (document) => !isDeepStrictEqual(document.testimonials, testimonials),
  )
  console.log(JSON.stringify({
    count: defaultTestimonials.length,
    names: defaultTestimonials.map((testimonial) => testimonial.name),
    pending: pending.map((document) => ({id: document._id, revision: document._rev})),
    draftWillBePublished: false,
  }))
  if (!process.argv.includes('--apply') || !pending.length) return

  const backup = join(tmpdir(), `troy-testimonials-${Date.now()}.json`)
  await writeFile(backup, JSON.stringify(documents, null, 2), {mode: 0o600, flag: 'wx'})
  console.log(`Private backup: ${backup}`)
  let transaction = client.transaction()
  for (const document of pending) {
    transaction = transaction.patch(document._id, (patch) => patch
      .ifRevisionId(document._rev).set({testimonials}))
  }
  await transaction.commit()
  for (const document of pending) {
    const saved = await client.getDocument(document._id)
    if (!isDeepStrictEqual(saved?.testimonials, testimonials)) {
      throw new Error(`Testimonial verification failed: ${document._id}`)
    }
    for (const [field, value] of Object.entries(document)) {
      if (['testimonials', '_rev', '_updatedAt'].includes(field)) continue
      if (!isDeepStrictEqual(saved?.[field], value)) {
        throw new Error(`Unexpected field change: ${document._id}.${field}`)
      }
    }
  }
  console.log('Verified testimonial-only changes; other content and draft status preserved.')
}

run().catch((error: Error) => {
  console.error(error.message)
  process.exitCode = 1
})
