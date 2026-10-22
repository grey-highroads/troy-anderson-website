import {defineArrayMember, defineField, defineType} from 'sanity'

export const mediaPageType = defineType({
  name: 'mediaPage',
  title: 'Media page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Page heading',
      type: 'string',
      description: 'The main heading at the top of the Media page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videoIntroduction',
      title: 'Main subheadline',
      type: 'text',
      description: 'Supporting copy beside the main page heading.',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'youtubeHeading',
      title: 'YouTube section heading',
      type: 'string',
      description: 'Defaults to “Troy’s YouTube Channel” when empty.',
    }),
    defineField({
      name: 'videoEmptyMessage',
      title: 'YouTube empty-state message',
      type: 'text',
      rows: 2,
      description: 'Shown only when no videos are available.',
    }),
    defineField({
      name: 'videos',
      title: 'YouTube videos',
      type: 'array',
      description: 'Add the approved hosted videos in the order they should appear.',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'promotionalVideo',
          title: 'YouTube video',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'A short public-facing name for this video.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'thumbnail',
              title: 'Custom thumbnail override',
              type: 'image',
              description:
                'Optional. Upload an approved poster only when it should replace the thumbnail supplied automatically by the video host.',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                  description:
                    'Briefly describe the thumbnail for visitors using assistive technology.',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
            defineField({
              name: 'mediaUrl',
              title: 'Video or channel URL',
              type: 'url',
              description:
                'The full approved destination, including https://. Use the clean hosted playback URL for video shown on this site, or an external video or channel URL when the link should intentionally open that platform.',
              validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
            }),
            defineField({
              name: 'shareCopy',
              title: 'Share copy',
              type: 'text',
              description: 'Approved text visitors can copy when sharing this video.',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'mediaUrl', media: 'thumbnail'},
          },
        }),
      ],
    }),
    defineField({
      name: 'podcastHeading',
      title: 'Podcast section heading',
      type: 'string',
      description: 'Defaults to “Podcast Appearances” when empty.',
    }),
    defineField({
      name: 'podcastIntroduction',
      title: 'Podcast section copy',
      type: 'text',
      rows: 3,
      description: 'The current placeholder or introduction. Defaults to “Coming soon.” when empty.',
    }),
    // Retain legacy data without exposing controls for removed public sections.
    defineField({name: 'photographyIntroduction', type: 'text', hidden: true, readOnly: true}),
    defineField({name: 'photos', type: 'array', hidden: true, readOnly: true,
      of: [defineArrayMember({name: 'publicityPhoto', type: 'object', fields: [
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'image', type: 'image', fields: [defineField({name: 'alt', type: 'string'})]}),
      ]})],
    }),
    defineField({name: 'publicityIntroduction', type: 'text', hidden: true, readOnly: true}),
    defineField({name: 'publicityMaterials', type: 'array', hidden: true, readOnly: true,
      of: [defineArrayMember({name: 'publicityMaterial', type: 'object', fields: [
        defineField({name: 'title', type: 'string'}),
        defineField({name: 'file', type: 'file'}),
      ]})],
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
