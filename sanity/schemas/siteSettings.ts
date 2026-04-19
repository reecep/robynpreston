import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site Title', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({
      name: 'logo',
      title: 'Header Logo',
      type: 'image',
      description: 'Logo image displayed in the navbar. Transparent PNG or SVG recommended.',
      options: { hotspot: false },
    }),
    defineField({ name: 'heroImage', title: 'Homepage Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'heroVideo',
      title: 'Homepage Hero Video (MP4)',
      type: 'file',
      description: 'Optional MP4 video for the hero background. If set, takes priority over the hero image.',
      options: { accept: 'video/mp4,video/webm' },
    }),
    defineField({ name: 'heroHeading', title: 'Homepage Hero Heading', type: 'string' }),
    defineField({ name: 'heroSubtext', title: 'Homepage Hero Subtext', type: 'text', rows: 2 }),
    defineField({
      name: 'contactImage',
      title: 'Contact Page Photo',
      type: 'image',
      description: 'Photo shown on the Contact page alongside the contact details.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (square PNG, ideally 512×512). Upload here to update without a code deploy.',
    }),
    defineField({
      name: 'headerBlockColor',
      title: 'Page Header Block Colour',
      type: 'string',
      description: 'Background colour for page headers when no banner image is uploaded. Any valid CSS colour (e.g. #526218, olive, rgb(82,98,24)).',
      initialValue: '#526218',
    }),
  ],
  preview: { prepare: () => ({ title: 'Site Settings' }) },
})
