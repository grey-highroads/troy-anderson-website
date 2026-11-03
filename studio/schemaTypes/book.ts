import {defineArrayMember, defineField, defineType} from 'sanity'

export const bookType = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fieldsets: [{name: 'sampleButton', title: 'Sample button', options: {collapsible: true, collapsed: false}}],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subheader',
      title: 'Subheader',
      type: 'string',
      description: 'Optional supporting line beneath the book title. Leave blank to hide it on the website.',
    }),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
      description: 'Optional introduction in the Book page hero. Leave blank to hide it on the website.',
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
    defineField({name: 'retailersHeading', title: 'Bookseller section heading', type: 'string', description: 'Defaults to “Choose your bookseller.” when not set.'}),
    defineField({name: 'endorsementsHeading', title: 'Endorsements section heading', type: 'string', description: 'Defaults to “What people are saying.” when not set.'}),
    defineField({name: 'sampleButtonLabel', title: 'Button copy', fieldset: 'sampleButton', type: 'string', description: 'Text shown on the sample button. Defaults to “Read a Sample” when not set.'}),
    defineField({name: 'sampleUnavailableLabel', title: 'Unavailable button copy', fieldset: 'sampleButton', type: 'string', description: 'Shown when neither an excerpt PDF nor a destination URL is provided. Defaults to “Read a Sample — Coming Soon” when not set.'}),
    defineField({
      name: 'samplePdf',
      title: 'Excerpt PDF',
      fieldset: 'sampleButton',
      type: 'file',
      description: 'Upload the PDF readers should open from the excerpt button. This takes priority over Destination URL. Publish the Book document when the file is ready.',
      options: {accept: 'application/pdf'},
      validation: (rule) => rule.custom(async (file, context) => {
        if (!file?.asset?._ref) return true
        const mimeType = await context.getClient({apiVersion: '2026-09-11'})
          .withConfig({useCdn: false})
          .fetch<string | null>('*[_id == $id][0].mimeType', {id: file.asset._ref})
        return mimeType === 'application/pdf' ? true : 'Please upload a PDF file.'
      }),
    }),
    defineField({
      name: 'sampleUrl',
      title: 'Destination URL',
      fieldset: 'sampleButton',
      type: 'url',
      description: 'Optional alternative link. Used only when no excerpt PDF is uploaded.',
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
            defineField({name: 'logo', title: 'Bookseller logo', type: 'image', description: 'Optional replacement for the default bookseller graphic. Use the original logo colors on a transparent or white background.'}),
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
