import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-09-11'}).withConfig({useCdn: false})
async function setCredit() {
  const about = await client.fetch('*[_type == "about"] | order(_updatedAt desc)[0]{_id, _rev}', {}, {perspective: 'published'})
  if (!about) throw new Error('Published About document not found.')
  const saved = await client.patch(about._id).ifRevisionId(about._rev).set({portraitCredit: 'Photo: Mark Laita'}).commit()
  console.log(`Biography photo credit saved: ${saved.portraitCredit}`)
}
setCredit().catch((error: Error) => { console.error(error.message); process.exitCode = 1 })
