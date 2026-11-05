import {defineArrayMember, defineField, defineType} from 'sanity'

export const homepageType = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'bookPromotion',
      title: 'Book promotion',
      type: 'object',
      description: 'Copy for the book panel above the footer. The arrow, uppercase styling and overlapping subhead stay fixed.',
      fields: [
        defineField({name: 'image', title: 'Book image', type: 'image',
          description: 'Optional replacement cover. Leave empty to keep the current book cover. The full image is shown without cropping.'}),
        defineField({name: 'imageAlt', title: 'Book image alt text', type: 'string',
          description: 'Describe the cover, including the book title and author. Required for a replacement image; also overrides the current cover’s description.',
          validation: (rule) => rule.custom((value, context) => {
            const parent = context.parent as {image?: {asset?: {_ref?: string}}} | undefined
            return !parent?.image?.asset?._ref || Boolean(value?.trim()) || 'Add alt text for the replacement book image.'
          })}),
        defineField({name: 'headline' , title: 'Headline', type: 'text', rows: 2,
          description: 'Use Enter to choose line breaks. Keep each line short for the oversized design. Leave blank for the original book title.'}),
        defineField({name: 'subhead', title: 'Subhead', type: 'string',
          description: 'For example: Available on Amazon or Now available. Leave blank for Available on Amazon.'}),
        defineField({name: 'supportingCopy', title: 'Supporting copy', type: 'text', rows: 3,
          description: 'Optional sentence-case copy below the announcement. Leave blank to hide it.'}),
      ],
    }),
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
              title: 'Full testimonial',
              type: 'text',
              description: 'The complete original testimonial, without surrounding quotation marks. Short testimonials appear in full.',
              rows: 8,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'excerpt',
              title: 'Short excerpt',
              type: 'text',
              description: 'Optional: use a short passage from the full testimonial. Visitors can expand it to read the original. Leave blank to show the full testimonial immediately.',
              rows: 3,
              validation: (rule) => rule.custom((value, context) => {
                if (!value?.trim()) return true
                const quote = (context.parent as {quote?: string} | undefined)?.quote
                const normalize = (text: string) => text.replace(/\s+/g, ' ').trim()
                return typeof quote === 'string' && normalize(quote).includes(normalize(value))
                  ? true
                  : 'Use an exact passage from the full testimonial.'
              }),
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
              description: 'Optional: their role, organization, or relationship to Troy. Leave blank when no attribution was supplied.',
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
