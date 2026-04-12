import { defineField, defineType } from 'sanity'

export const homePageSchema = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'whyUsHeading',
      title: 'Why Us Section Heading',
      type: 'string',
      description: 'Heading for the "Why Safari With Us" callout section.',
      initialValue: 'Why Safari With REP Kenya Safaris?',
    }),
    defineField({
      name: 'whyUsBackgroundImage',
      title: 'Why Us Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Full-bleed background image behind the Why Us callout section.',
    }),
    defineField({
      name: 'whyUsItems',
      title: 'Why Us Bullet Points',
      type: 'array',
      description: 'Each item is shown with a checkmark.',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'testimonialsHeading',
      title: 'Testimonials Section Heading',
      type: 'string',
      description: 'Heading above the homepage testimonials strip.',
      initialValue: 'What Our Guests Say',
    }),
    defineField({
      name: 'testimonials',
      title: 'Homepage Testimonials',
      type: 'array',
      description: 'Short quotes shown on the homepage. For full reviews use the Reviews collection.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
            defineField({ name: 'packageLabel', title: 'Package Name', type: 'string', description: 'e.g. "5-Day Maasai Mara Safari"' }),
          ],
          preview: {
            select: { title: 'packageLabel', subtitle: 'quote' },
          },
        },
      ],
    }),
    defineField({
      name: 'aboutPreviewImage',
      title: 'About Preview Portrait',
      type: 'image',
      options: { hotspot: true },
      description: 'Portrait photo shown in the "About Robyn" preview section on the homepage.',
    }),
    defineField({
      name: 'aboutPreviewHeading',
      title: 'About Preview Heading',
      type: 'string',
      description: 'Heading for the About preview section.',
      initialValue: 'From New Zealand to Kenya',
    }),
    defineField({
      name: 'aboutPreviewText',
      title: 'About Preview Text',
      type: 'text',
      rows: 5,
      description: 'Short paragraph shown beside the portrait. Longer biography lives on the About page.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
})
