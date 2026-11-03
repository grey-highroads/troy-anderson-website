import {defineArrayMember, defineField, defineType} from 'sanity'
import {websiteClipOptions} from '../../lib/media-clips'

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
      title: 'Video section heading',
      type: 'string',
      description: 'Defaults to “Troy’s Videos” when empty.',
    }),
    defineField({
      name: 'videoEmptyMessage',
      title: 'Video empty-state message',
      type: 'text',
      rows: 2,
      description: 'Shown only when no videos are available.',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      description: 'Choose website clips or external video links in the order they should appear.',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'promotionalVideo',
          title: 'Video',
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
              name: 'hostedClip',
              title: 'Website video',
              type: 'string',
              options: {list: websiteClipOptions},
              description: 'Choose an existing full clip to play on this page with audio and controls. Leave blank to use an external URL.',
              validation: (rule) => rule.custom((value) => !value || websiteClipOptions.some((clip) => clip.value === value) ? true : 'Choose one of the available website videos.'),
            }),
            defineField({
              name: 'thumbnail',
              title: 'Custom thumbnail override',
              type: 'image',
              description:
                'Optional. Replaces the default poster for the selected website clip or external video.',
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
              title: 'External video or channel URL',
              type: 'url',
              hidden: ({parent}) => Boolean(parent?.hostedClip),
              description:
                'The full external destination, including https://. Used only when Website video is blank.',
              validation: (rule) => rule.uri({scheme: ['http', 'https']}).custom((value, context) => {
                const parent = context.parent as {hostedClip?: string} | undefined
                return parent?.hostedClip || value ? true : 'Choose a website video or enter an external URL.'
              }),
            }),
            defineField({
              name: 'shareCopy',
              title: 'Share copy',
              type: 'text',
              description: 'Optional description shown below the title and copied when sharing. Leave blank to use the title as the sharing text.',
              rows: 4,
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
