import { defineField, defineType } from 'sanity'

export const storiesPageSchema = defineType({
  name: 'storiesPage',
  title: 'Stories Page',
  type: 'document',
  fields: [
    defineField({ name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'introHeading', title: 'Intro Heading', type: 'string' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'text', rows: 4 }),
  ],
  preview: { prepare: () => ({ title: 'Stories Page' }) },
})
