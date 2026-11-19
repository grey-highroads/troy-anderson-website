import {writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {isDeepStrictEqual} from 'node:util'
import {getCliClient} from 'sanity/cli'
import storyBody from '../../docs/about-story-20261118.json'

// Dry run: sanity exec scripts/update-about-story.ts --with-user-token
// Apply only this approved field: append -- --apply. Existing drafts are never published.
const client = getCliClient({apiVersion: '2026-09-11'}).withConfig({useCdn: false})


async function run() {
  const documents = await client.fetch<Array<{
    _id: string; _rev: string; storyBody?: unknown; [key: string]: unknown
  }>>('*[_type == "about" && !(_id in path("versions.**"))]', {}, {perspective: 'raw'})
  const published = documents.filter((document) => !document._id.startsWith('drafts.'))
  if (published.length !== 1) throw new Error('Expected exactly one published About.')
  const about = published[0]
  const draft = documents.find((document) => document._id === `drafts.${about._id}`)
  if (draft && !isDeepStrictEqual(draft.storyBody, about.storyBody) &&
      !isDeepStrictEqual(draft.storyBody, storyBody)) {
    throw new Error('About has independent story draft edits. No content was changed.')
  }
  const pending = [about, ...(draft ? [draft] : [])].filter(
    (document) => !isDeepStrictEqual(document.storyBody, storyBody),
  )
  console.log(JSON.stringify({
    blocks: storyBody.length,
    pending: pending.map((document) => ({id: document._id, revision: document._rev})),
    draftWillBePublished: false,
  }))
  if (!process.argv.includes('--apply') || !pending.length) return

  const backup = join(tmpdir(), `troy-storyBody-${Date.now()}.json`)
  await writeFile(backup, JSON.stringify(documents, null, 2), {mode: 0o600, flag: 'wx'})
  console.log(`Private backup: ${backup}`)
  let transaction = client.transaction()
  for (const document of pending) {
    transaction = transaction.patch(document._id, (patch) => patch
      .ifRevisionId(document._rev).set({storyBody}))
  }
  await transaction.commit()
  for (const document of pending) {
    const saved = await client.getDocument(document._id)
    if (!isDeepStrictEqual(saved?.storyBody, storyBody)) {
      throw new Error(`Story verification failed: ${document._id}`)
    }
    for (const [field, value] of Object.entries(document)) {
      if (['storyBody', '_rev', '_updatedAt'].includes(field)) continue
      if (!isDeepStrictEqual(saved?.[field], value)) {
        throw new Error(`Unexpected field change: ${document._id}.${field}`)
      }
    }
  }
  console.log('Verified story-only changes; other content and draft status preserved.')
}

run().catch((error: Error) => {
  console.error(error.message)
  process.exitCode = 1
})
