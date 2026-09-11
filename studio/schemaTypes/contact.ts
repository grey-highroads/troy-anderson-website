import {defineField, defineType} from 'sanity'

export const contactType = defineType({
  name: 'contact',
  title: 'Contact page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page heading',
      type: 'string',
      description: 'The large heading at the top of the Contact page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      description: 'A short introduction shown directly below the page heading.',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'portraitImage',
      title: 'Portrait',
      type: 'image',
      description: 'Use a clear portrait of Troy. The crop can be adjusted with the hotspot tool.',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Briefly describe the portrait for visitors using assistive technology.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'formHeading',
      title: 'Form heading',
      type: 'string',
      description: 'The heading above the contact form.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'portraitImage',
    },
  },
})
