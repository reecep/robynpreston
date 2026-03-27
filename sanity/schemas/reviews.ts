import { defineField, defineType } from 'sanity'

export const reviewsSchema = defineType({
  name: 'reviews',
  title: 'Reviews',
  type: 'document',
  fields: [
    defineField({ name: 'reviewerName', title: 'Reviewer Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'quote', title: 'Review Quote', type: 'text', rows: 4, validation: r => r.required() }),
    defineField({
      name: 'package',
      title: 'Package',
      type: 'reference',
      to: [{ type: 'packages' }],
    }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: r => r.min(1).max(5),
    }),
  ],
  preview: {
    select: { title: 'reviewerName', subtitle: 'package.title', description: 'quote' },
    prepare({ title, subtitle, description }) {
      return { title, subtitle: subtitle || 'No package', description }
    },
  },
})
