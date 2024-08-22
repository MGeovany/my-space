import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { DateTime } from 'luxon'

export const UserFactory = factory

  .define(User, async ({ faker }) => {
    const defaultTimestamp = DateTime.fromJSDate(faker.date.past())
    return {
      fullName: faker.internet.email(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      createdAt: defaultTimestamp,
      updatedAt: defaultTimestamp,
    }
  })
  .build()
