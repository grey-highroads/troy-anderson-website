import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-09-11'}).withConfig({useCdn: false})

async function createPress() {
  const existing = await client.fetch('*[_type == "press" && !(_id in path("drafts.**"))][0]{_id}')
  if (existing) { console.log('Press page already exists; content preserved.'); return }
  const media = await client.fetch('*[_type == "mediaPage"] | order(_updatedAt desc)[0]{photos, photographyIntroduction}', {}, {perspective: 'published'})
  if (!media?.photos?.length) throw new Error('No approved photography found to copy.')
  await client.createIfNotExists({
    _id: 'press',
    _type: 'press',
    heading: 'Press',
    intro: 'Approved photography for editorial and publicity use.',
    photographyHeading: 'Approved images',
    photographyIntroduction: media.photographyIntroduction || 'Download approved photography for editorial and publicity use.',
    downloadLabel: 'Download image',
    emptyMessage: 'Approved photography will be available here soon.',
    photos: media.photos,
  })
  const saved = await client.getDocument('press')
  if (saved?.photos?.length !== media.photos.length) throw new Error('Press photo verification failed.')
  console.log(`Created Press page with ${saved.photos.length} existing photos; original Media content preserved.`)
}

createPress().catch((error: Error) => { console.error(error.message); process.exitCode = 1 })
