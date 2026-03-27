import { defineField, defineType } from 'sanity'

export const reviewsPageSchema = defineType({
  name: 'reviewsPage',
  title: 'Reviews Page',
  type: 'document',
  fields: [
    defineField({ name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
      description: 'Short paragraph shown below the banner, above the reviews grid.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Reviews Page' }) },
})
