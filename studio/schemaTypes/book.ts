import {defineArrayMember, defineField, defineType} from 'sanity'

export const bookType = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      description: 'The short introduction shown at the top of the Book page.',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          description: 'Describe the cover for visitors using assistive technology.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'overviewHeading',
      title: 'Overview heading',
      type: 'string',
    }),
    defineField({
      name: 'overviewBody',
      title: 'Overview copy',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'forewordExcerpt',
      title: 'Foreword excerpt',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'forewordByline',
      title: 'Foreword byline',
      type: 'string',
      description: 'For example: William Paul Young.',
    }),
    defineField({
      name: 'inspirationHeading',
      title: 'Behind the book heading',
      type: 'string',
    }),
    defineField({
      name: 'inspirationBody',
      title: 'Behind the book copy',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'sampleUrl',
      title: 'Sample URL',
      type: 'url',
      description: 'Optional link used by the Read a Sample button.',
    }),
    defineField({
      name: 'retailers',
      title: 'Retailers',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'retailer',
          title: 'Retailer',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Purchase URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'url'},
          },
        }),
      ],
    }),
    defineField({
      name: 'endorsements',
      title: 'Endorsements',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'endorsement',
          title: 'Endorsement',
          type: 'object',
          fields: [
            defineField({
              name: 'quote',
              title: 'Quote',
              type: 'text',
              rows: 4,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'attribution',
              title: 'Attribution',
              type: 'string',
              description: 'Optional role, publication, or organization.',
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'attribution'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
})
