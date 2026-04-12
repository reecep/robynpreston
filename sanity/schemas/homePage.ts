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
  ],
  preview: { prepare: () => ({ title: 'Home Page' }) },
})
