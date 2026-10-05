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
      title: 'Video introduction',
      type: 'text',
      description: 'Short copy introducing the promotional videos available below.',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videos',
      title: 'Promotional videos',
      type: 'array',
      description: 'Add the approved YouTube videos in the order they should appear.',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'promotionalVideo',
          title: 'Promotional video',
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
              name: 'youtubeUrl',
              title: 'YouTube URL',
              type: 'url',
              description: 'The full link to the approved YouTube video, including https://.',
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
            select: {title: 'title', subtitle: 'youtubeUrl'},
          },
        }),
      ],
    }),
    defineField({
      name: 'photographyIntroduction',
      title: 'Photography introduction',
      type: 'text',
      description: 'Short copy introducing the approved photos available for download.',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Downloadable photos',
      type: 'array',
      description: 'Upload the approved publicity photos in the order they should appear.',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'publicityPhoto',
          title: 'Publicity photo',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'A short label that helps visitors identify the photo.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Photo',
              type: 'image',
              description: 'Upload the final high-resolution photo approved for publicity use.',
              options: {hotspot: true},
              validation: (rule) => rule.required(),
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alternative text',
                  type: 'string',
                  description: 'Briefly describe the photo for visitors using assistive technology.',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title', media: 'image'},
          },
        }),
      ],
    }),
    defineField({
      name: 'publicityIntroduction',
      title: 'Publicity materials introduction',
      type: 'text',
      description: 'Short copy introducing the one-sheets and other downloadable materials.',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publicityMaterials',
      title: 'Publicity materials',
      type: 'array',
      description: 'Upload the approved one-sheets and other publicity files.',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'publicityMaterial',
          title: 'Publicity material',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'The public-facing name of this download.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'file',
              title: 'File',
              type: 'file',
              description: 'Upload the final approved file with a clear, client-friendly filename.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'title'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
