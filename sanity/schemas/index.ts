import { packagesSchema } from './packages'
import { postsSchema } from './posts'
import { siteSettingsSchema } from './siteSettings'
import { aboutPageSchema } from './aboutPage'
import { whyUsPageSchema } from './whyUsPage'
import { packagesPageSchema } from './packagesPage'
import { storiesPageSchema } from './storiesPage'
import { reviewsSchema } from './reviews'

export const schemaTypes = [
  packagesSchema,
  postsSchema,
  reviewsSchema,
  siteSettingsSchema,
  aboutPageSchema,
  whyUsPageSchema,
  packagesPageSchema,
  storiesPageSchema,
]
