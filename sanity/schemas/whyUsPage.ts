import { defineField, defineType } from 'sanity'

export const whyUsPageSchema = defineType({
  name: 'whyUsPage',
  title: 'Why Us Page',
  type: 'document',
  fields: [
    defineField({ name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'highlights',
      title: 'Highlight Boxes',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'icon', title: 'Icon (emoji)', type: 'string' },
        { name: 'label', title: 'Label', type: 'string' },
      ]}],
    }),
    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Section Title', type: 'string' },
        { name: 'body', title: 'Section Body', type: 'text', rows: 6 },
      ]}],
    }),
  ],
  preview: { prepare: () => ({ title: 'Why Us Page' }) },
})
