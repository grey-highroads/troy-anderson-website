import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  fields: [
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      description: "The full link to Troy's Instagram profile, including https://.",
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: "The full link to Troy's YouTube channel, including https://.",
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'threadsUrl',
      title: 'Threads URL',
      type: 'url',
      description: "The full link to Troy's Threads profile, including https://.",
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    // Preserve the former value without exposing it in the editor or footer.
    defineField({
      name: 'linkedinUrl',
      title: 'Legacy LinkedIn URL',
      type: 'url',
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    prepare: () => ({title: 'Social links'}),
  },
})
