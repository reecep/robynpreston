import { defineField, defineType } from 'sanity'

export const contactPageSchema = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
      description: 'Short paragraph shown above the contact details.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Contact Page' }) },
})
