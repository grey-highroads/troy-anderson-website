import {writeFile} from 'node:fs/promises'
import {tmpdir} from 'node:os'
import {join} from 'node:path'
import {isDeepStrictEqual} from 'node:util'
import {getCliClient} from 'sanity/cli'
import {introductionToBlocks} from '../../lib/sanity/homepage'

// Run with `sanity exec scripts/migrate-homepage-introduction.ts --with-user-token`.
// Inspect the dry run first; append `-- --apply` to convert only this field.
const client = getCliClient({apiVersion: '2026-09-11'}).withConfig({useCdn: false})

async function migrate() {
  const documents = await client.fetch<Array<{_id: string; _rev: string; meetTroySummary?: unknown}>>(
    '*[_type == "homepage" && !(_id in path("versions.**"))]',
    {},
    {perspective: 'raw'},
  )
  const pending = documents.filter((document) => typeof document.meetTroySummary === 'string')
  console.log(JSON.stringify(pending.map((document) => ({
    id: document._id,
    paragraphs: introductionToBlocks(document.meetTroySummary as string).length,
    lineBreaks: (document.meetTroySummary as string).match(/\n/g)?.length || 0,
  }))))
  if (!process.argv.includes('--apply') || !pending.length) return

  const backup = join(tmpdir(), `troy-homepage-introduction-${Date.now()}.json`)
  await writeFile(backup, JSON.stringify(documents, null, 2), {mode: 0o600, flag: 'wx'})
  console.log(`Content backup: ${backup}`)
  let transaction = client.transaction()
  for (const document of pending) {
    transaction = transaction.patch(document._id, (patch) => patch
      .ifRevisionId(document._rev)
      .set({meetTroySummary: introductionToBlocks(document.meetTroySummary as string)}))
  }
  await transaction.commit()
  for (const document of pending) {
    const saved = await client.getDocument(document._id)
    if (!isDeepStrictEqual(saved?.meetTroySummary, introductionToBlocks(document.meetTroySummary as string))) {
      throw new Error(`Introduction verification failed: ${document._id}`)
    }
    for (const [field, value] of Object.entries(document)) {
      if (field === 'meetTroySummary' || ['_rev', '_updatedAt'].includes(field)) continue
      if (!isDeepStrictEqual(saved?.[field], value)) {
        throw new Error(`Unexpected field change: ${document._id}.${field}`)
      }
    }
  }
  console.log(`Verified ${pending.length} converted document(s); other fields preserved.`)
}

migrate().catch((error: Error) => {
  console.error(error.message)
  process.exitCode = 1
})
