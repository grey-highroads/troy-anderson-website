import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page heading',
      type: 'string',
      description: 'The large heading at the top of the About page.',
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
      name: 'biographyHeading',
      title: 'Biography heading',
      type: 'string',
      description: 'The heading beside the portrait.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'biographyBody',
      title: 'Biography',
      type: 'array',
      description: 'A concise introduction to Troy, his background, and his work today.',
      of: [defineArrayMember({type: 'block'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'storyHeading',
      title: 'Story heading',
      type: 'string',
      description: 'The heading that introduces Troy’s longer-form story.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'storyBody',
      title: 'Troy’s story',
      type: 'array',
      description: 'The longer story about the experiences and perspective that shaped Troy.',
      of: [defineArrayMember({type: 'block'})],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'pullQuote',
      title: 'Pull quote',
      type: 'text',
      description: 'A quote from Troy shown below the backstory video.',
      rows: 4,
    }),
    defineField({
      name: 'storyVideo',
      title: 'Backstory video',
      type: 'file',
      options: {accept: 'video/mp4,video/webm'},
      description: 'Shown beside My Backstory. Leave empty to use video #14, “How Troy Started Coaching.”',
    }),
    defineField({
      name: 'storyVideoPoster',
      title: 'Backstory video poster',
      type: 'image',
      description: 'Preview image shown before playback. Leave empty to use the default video #14 poster.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'portraitImage',
    },
  },
})
