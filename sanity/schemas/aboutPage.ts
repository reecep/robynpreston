import { defineField, defineType } from 'sanity'

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'bio', title: 'Biography', type: 'text', rows: 15 }),
    defineField({ name: 'portraitImage', title: 'Portrait Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'mediaFeatures',
      title: 'Media Features',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of publications/media outlets Robyn has been featured in',
    }),
  ],
  preview: { prepare: () => ({ title: 'About Page' }) },
})
