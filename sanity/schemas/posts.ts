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
    defineField({
      name: 'body',
      title: 'Content',
      type: 'array',
      description: 'Rich text content. Use the toolbar for headings, bold/italic, links, and images.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2', value: 'h2' },
            { title: 'Heading 3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', type: 'string', title: 'Alt text' }),
            defineField({ name: 'caption', type: 'string', title: 'Caption' }),
          ],
        },
      ],
    }),
    defineField({ name: 'htmlContent', title: 'Legacy HTML (WordPress import)', type: 'text', rows: 10,
      description: 'Read-only. Original WordPress HTML — kept as fallback until body field is populated.' }),
  ],
  preview: {
    select: { title: 'title', media: 'featuredImage', subtitle: 'category' },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle }
    },
  },
  orderings: [{ title: 'Date, newest', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] }],
})
