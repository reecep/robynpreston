import { defineField, defineType } from 'sanity'

export const packagesSchema = defineType({
  name: 'packages',
  title: 'Packages',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first on the Packages listing page.',
    }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'content', title: 'Description', type: 'text', rows: 6 }),
    defineField({ name: 'totalDays', title: 'Total Days', type: 'string' }),
    defineField({ name: 'lowestPrice', title: 'Lowest Price (USD)', type: 'string' }),
    defineField({ name: 'bannerImage', title: 'Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'testimonial', title: 'Guest Testimonial', type: 'text', rows: 3 }),
    defineField({ name: 'lowSeasonDates', title: 'Low Season Dates', type: 'string' }),
    defineField({ name: 'highSeasonDates', title: 'High Season Dates', type: 'string' }),
    defineField({
      name: 'lowSeasonRates',
      title: 'Low Season Rates',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'people', title: 'Number of People', type: 'string' },
        { name: 'pricePerPerson', title: 'Price Per Person (USD)', type: 'string' },
      ]}],
    }),
    defineField({
      name: 'highSeasonRates',
      title: 'High Season Rates',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'people', title: 'Number of People', type: 'string' },
        { name: 'pricePerPerson', title: 'Price Per Person (USD)', type: 'string' },
      ]}],
    }),
    defineField({
      name: 'days',
      title: 'Itinerary Days',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'number', title: 'Day Number(s)', type: 'string' },
        { name: 'title', title: 'Day Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
      ]}],
    }),
    defineField({
      name: 'includes',
      title: 'What\'s Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'excludes',
      title: 'What\'s Not Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'title', media: 'bannerImage', subtitle: 'totalDays' },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle: subtitle ? `${subtitle} days` : '' }
    },
  },
})
