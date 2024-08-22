import factory from '@adonisjs/lucid/factories'
import Bookmark from '#models/bookmark'
import { DateTime } from 'luxon'
import { BookmarkTag } from '../../app/constants/index.js'

export const BookmarkFactory = factory
  .define(Bookmark, async ({ faker }) => {
    const defaultTimestamp = DateTime.fromJSDate(faker.date.past())

    return {
      title: faker.lorem.words(3),
      url: faker.internet.url(),
      description: faker.lorem.sentence(),
      tag: BookmarkTag.PORFOLIO,
      createdAt: defaultTimestamp,
      updatedAt: defaultTimestamp,
    }
  })
  .build()
