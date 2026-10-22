export const contentQueries = {
  book: `*[_type == "book"] | order(_updatedAt desc)[0]{
  _id, _rev, _updatedAt,
  title,
  subheader,
  intro,
  "coverImageUrl": coverImage.asset->url,
  "coverImageWidth": coverImage.asset->metadata.dimensions.width,
  "coverImageHeight": coverImage.asset->metadata.dimensions.height,
  "coverImageAlt": coverImage.alt,
  overviewHeading,
  overviewBody,
  inspirationHeading,
  inspirationBody,
  sampleUrl,
  retailersHeading,
  endorsementsHeading,
  sampleButtonLabel,
  sampleUnavailableLabel,

  retailers[]{name, url},
  endorsements[]{quote, name, attribution}
}`,
  about: `*[_type == "about"] | order(_updatedAt desc)[0]{
  _id, _rev, _updatedAt,
  title,
  intro,
  "portraitImageUrl": portraitImage.asset->url,
  "portraitImageWidth": portraitImage.asset->metadata.dimensions.width,
  "portraitImageHeight": portraitImage.asset->metadata.dimensions.height,
  "portraitImageAlt": portraitImage.alt,
  biographyHeading,
  biographyBody,
  storyHeading,
  storyBody,
  pullQuote,
  storyVideoTitle,
  "storyVideoUrl": storyVideo.asset->url,
  "storyVideoPosterUrl": storyVideoPoster.asset->url
}`,
  homepage: `*[_type == "homepage"] | order(_updatedAt desc)[0]{
  _id, _rev, _updatedAt,
  meetTroyHeading,
  meetTroySummary,
  "meetTroyPortraitUrl": meetTroyPortrait.asset->url,
  "meetTroyPortraitWidth": meetTroyPortrait.asset->metadata.dimensions.width,
  "meetTroyPortraitHeight": meetTroyPortrait.asset->metadata.dimensions.height,
  "meetTroyPortraitAlt": meetTroyPortrait.alt,
  testimonialsHeading,
  testimonials[]{
    _key,
    quote,
    name,
    credentials
  }
}`,
  contact: `*[_type == "contact"] | order(_updatedAt desc)[0]{
  _id, _rev, _updatedAt,
  title,
  intro,
  "portraitImageUrl": portraitImage.asset->url,
  "portraitImageWidth": portraitImage.asset->metadata.dimensions.width,
  "portraitImageHeight": portraitImage.asset->metadata.dimensions.height,
  "portraitImageAlt": portraitImage.alt,
  formHeading,
  formCopy
}`,
  mediaPage: `*[_type == "mediaPage"] | order(_updatedAt desc)[0]{
  _id, _rev, _updatedAt,
  heading,
  videoIntroduction,
  youtubeHeading,
  videoEmptyMessage,
  podcastHeading,
  podcastIntroduction,
  videos[]{
    _key, title, mediaUrl, shareCopy,
    thumbnail{
      "imageUrl": asset->url,
      "width": asset->metadata.dimensions.width,
      "height": asset->metadata.dimensions.height,
      alt
    }
  },
  photographyIntroduction,
  photos[]{
    _key,
    title,
    "imageUrl": image.asset->url,
    "width": image.asset->metadata.dimensions.width,
    "height": image.asset->metadata.dimensions.height,
    "alt": image.alt
  },
  publicityIntroduction,
  publicityMaterials[]{
    _key,
    title,
    "fileUrl": file.asset->url,
    "originalFilename": file.asset->originalFilename
  }
}`,
  press: `*[_type == "press"] | order(_updatedAt desc)[0]{
    _id, _rev, _updatedAt,
    heading, intro, photographyHeading, photographyIntroduction, downloadLabel, emptyMessage,
    photos[]{
      _key, title,
      "imageUrl": image.asset->url,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "alt": image.alt
    }
  }`,
  siteSettings: `*[_type == "siteSettings"] | order(_updatedAt desc)[0]{
  _id, _rev, _updatedAt,
  instagramUrl,
  youtubeUrl,
  linkedinUrl
}`,
} as const;

export type ContentType = keyof typeof contentQueries;
