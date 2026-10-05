import {defineArrayMember, defineField, defineType} from 'sanity'

export const testimonialsPageType = defineType({
  name: 'testimonialsPage',
  title: 'Testimonials page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Page heading',
      type: 'string',
      description: 'The main heading at the top of the Testimonials page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'introduction',
      title: 'Introduction',
      type: 'text',
      description: 'A short introduction shown directly below the page heading.',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      description: 'Add the approved testimonials in the order they should appear on the page.',
      validation: (rule) => rule.required().min(1),
      of: [
        defineArrayMember({
          name: 'testimonial',
          title: 'Testimonial',
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              description: 'Enter the testimonial without quotation marks.',
              rows: 5,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              description: 'The name of the person being quoted.',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'credentials',
              title: 'Credentials',
              type: 'string',
              description: 'Their role, organization, or relationship to Troy.',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'credentials'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading'},
  },
})
