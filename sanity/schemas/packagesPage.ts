import { defineField, defineType } from 'sanity'

export const packagesPageSchema = defineType({
  name: 'packagesPage',
  title: 'Packages Page',
  type: 'document',
  fields: [
    defineField({ name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'introHeading', title: 'Intro Heading', type: 'string' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'text', rows: 4 }),
    defineField({
      name: 'detailBannerImage',
      title: 'Package Detail Header Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Shared header image shown at the top of every individual package page.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Packages Page' }) },
})
