import factory from '@adonisjs/lucid/factories'
import Blog from '#models/blog'
import { DateTime } from 'luxon'

export const BlogFactory = factory
  .define(Blog, async ({ faker }) => {
    const defaultTimestamp = DateTime.fromJSDate(faker.date.past())

    return {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      createdAt: defaultTimestamp,
      updatedAt: defaultTimestamp,
    }
  })
  .build()
