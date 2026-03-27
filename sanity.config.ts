import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

const singletons = ['siteSettings', 'aboutPage', 'whyUsPage', 'packagesPage', 'storiesPage', 'contactPage']

export default defineConfig({
  name: 'rep-kenya-safaris',
  title: 'REP Kenya Safaris',
  projectId: 'cqw1iau6',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.documentTypeListItem('packages').title('Packages'),
            S.documentTypeListItem('posts').title('Posts'),
            S.documentTypeListItem('reviews').title('Reviews'),
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('About Page')
              .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
            S.listItem()
              .title('Why Us Page')
              .child(S.document().schemaType('whyUsPage').documentId('whyUsPage')),
            S.listItem()
              .title('Packages Page')
              .child(S.document().schemaType('packagesPage').documentId('packagesPage')),
            S.listItem()
              .title('Stories Page')
              .child(S.document().schemaType('storiesPage').documentId('storiesPage')),
            S.listItem()
              .title('Contact Page')
              .child(S.document().schemaType('contactPage').documentId('contactPage')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (prev) => prev.filter((t) => !singletons.includes(t.schemaType)),
  },
})
