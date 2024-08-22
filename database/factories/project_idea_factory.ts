import factory from '@adonisjs/lucid/factories'
import ProjectIdea from '#models/project_idea'
import { DateTime } from 'luxon'

export const ProjectIdeaFactory = factory
  .define(ProjectIdea, async ({ faker }) => {
    const defaultTimestamp = DateTime.fromJSDate(faker.date.past())

    return {
      title: faker.lorem.sentence(),
      description: faker.lorem.paragraph(),
      url: faker.internet.url(),
      createdAt: defaultTimestamp,
      updatedAt: defaultTimestamp,
    }
  })
  .build()
