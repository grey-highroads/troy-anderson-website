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
      description: 'Supporting copy beside the page heading on desktop and below it on mobile.',
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
    defineField({
      name: 'formCopy',
      title: 'Form labels and messages',
      type: 'object',
      description: 'Edit the visible form copy. Unset fields use the current website wording. Delivery settings remain managed separately.',
      fields: [
        defineField({name: 'nameLabel', title: 'Name label', type: 'string'}),
        defineField({name: 'emailLabel', title: 'Email label', type: 'string'}),
        defineField({name: 'inquiryLabel', title: 'Inquiry type label', type: 'string'}),
        defineField({name: 'inquiryPlaceholder', title: 'Inquiry selection prompt', type: 'string'}),
        defineField({name: 'messageLabel', title: 'Message label', type: 'string'}),
        defineField({name: 'submitLabel', title: 'Submit button label', type: 'string'}),
        defineField({name: 'sendingLabel', title: 'Sending button label', type: 'string'}),
        defineField({name: 'sendingMessage', title: 'Sending message', type: 'text'}),
        defineField({name: 'successMessage', title: 'Success message', type: 'text'}),
        defineField({name: 'rateLimitMessage', title: 'Rate limit message', type: 'text'}),
        defineField({name: 'validationMessage', title: 'Validation message', type: 'text'}),
        defineField({name: 'errorMessage', title: 'Error message', type: 'text'}),
        defineField({name: 'deliveryNotice', title: 'Form delivery notice', type: 'text'}),
        defineField({name: 'unavailableMessage', title: 'Form unavailable message', type: 'text'}),
        defineField({name: 'inquiryOptions', title: 'Inquiry options', type: 'array', of: [{type: 'string'}], validation: (rule) => rule.min(1).unique()}),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'portraitImage',
    },
  },
})
