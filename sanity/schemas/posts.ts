import { defineField, defineType } from 'sanity'

export const postsSchema = defineType({
  name: 'posts',
  title: 'Posts',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Stories', 'Media'], layout: 'radio' },
      validation: r => r.required(),
    }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'htmlContent', title: 'Content (HTML)', type: 'text', rows: 20,
      description: 'Migrated content from WordPress. Edit carefully or use a new post for fresh content.' }),
  ],
  preview: {
    select: { title: 'title', media: 'featuredImage', subtitle: 'category' },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle }
    },
  },
  orderings: [{ title: 'Date, newest', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
})
