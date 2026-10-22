import {defineArrayMember, defineField, defineType} from 'sanity'

export const pressType = defineType({
  name: 'press',
  title: 'Press page',
  type: 'document',
  fields: [
    defineField({name: 'heading', title: 'Page heading', type: 'string'}),
    defineField({name: 'intro', title: 'Main subheadline', type: 'text', rows: 3}),
    defineField({name: 'photographyHeading', title: 'Photography section heading', type: 'string'}),
    defineField({name: 'photographyIntroduction', title: 'Photography introduction', type: 'text', rows: 3}),
    defineField({name: 'downloadLabel', title: 'Download link label', type: 'string'}),
    defineField({name: 'emptyMessage', title: 'No photos message', type: 'text', rows: 2}),
    defineField({
      name: 'photos',
      title: 'Approved images',
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
  ],
  preview: {select: {title: 'heading'}},
})
