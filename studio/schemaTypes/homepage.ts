import {defineArrayMember, defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'meetTroyHeading',
      title: 'Meet Troy heading',
      type: 'string',
      description: 'The heading for the short Meet Troy section on the homepage.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meetTroySummary',
      title: 'Meet Troy introduction',
      type: 'array',
      description:
        'A brief introduction to Troy that encourages visitors to continue to the About page.',
      of: [defineArrayMember({type: 'block'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'meetTroyPortrait',
      title: 'Meet Troy portrait',
      type: 'image',
      description:
        'Use the approved color portrait for the homepage. Adjust the crop with the hotspot tool.',
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
      name: 'testimonialsHeading',
      title: 'Testimonials heading',
      type: 'string',
      description: 'The heading above the homepage testimonials.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      description:
        'Add the approved quotes in the order they should appear on the homepage.',
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
              rows: 4,
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
            select: {
              title: 'name',
              subtitle: 'credentials',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'meetTroyHeading',
      media: 'meetTroyPortrait',
    },
  },
})
