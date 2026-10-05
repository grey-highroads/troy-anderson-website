import {defineField, defineType} from 'sanity'

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
      type: 'text',
      description:
        'A brief introduction to Troy that encourages visitors to continue to the About page.',
      rows: 5,
      validation: (rule) => rule.required(),
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
  ],
  preview: {
    select: {
      title: 'meetTroyHeading',
      media: 'meetTroyPortrait',
    },
  },
})
