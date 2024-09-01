import { ProjectIdeaFactory } from '#database/factories/project_idea_factory'
import { UserFactory } from '#database/factories/user_factory'
import AuditLog from '#models/audit_log'
import ProjectIdea from '#models/project_idea'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { AuditLogAction } from '../../app/constants/index.js'
import { MESSAGES } from '../../app/constants/messages.js'

test.group('Project ideas controller', (group) => {
  group.each.setup(async () => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())
    group.each.setup(() => testUtils.db().truncate())
  })

  test('should return a list of project ideas', async ({ client }) => {
    const projectIdea = await ProjectIdeaFactory.create()

    const response = await client.get('/api/project_ideas')

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      data: [
        {
          id: projectIdea.id,
          title: projectIdea.title,
          description: projectIdea.description,
          url: projectIdea.url,
        },
      ],
    })
  })

  test('should return a single project idea by ID', async ({ client }) => {
    const projectIdea = await ProjectIdeaFactory.create()

    const response = await client.get(`/api/project_ideas/${projectIdea.id}`)

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      data: {
        id: projectIdea.id,
        title: projectIdea.title,
        description: projectIdea.description,
        url: projectIdea.url,
      },
    })
  })

  test('should create a new project idea', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const newProjectIdea = await ProjectIdeaFactory.make()

    const response = await client.post('/api/project_ideas').loginAs(user).json(newProjectIdea)

    response.assertStatus(201)
    response.assertBodyContains({
      success: true,
      message: MESSAGES.projectIdeaCreateSuccess,
    })

    const projectIdea = await ProjectIdea.findByOrFail('title', newProjectIdea.title)

    assert.isNotNull(projectIdea)
    assert.exists(
      await AuditLog.query()
        .where('action', AuditLogAction.CREATE)
        .where('user_id', user.id)
        .where('table', 'project_ideas')
    )
  })

  test('should update a project idea', async ({ client, assert }) => {
    const user = await UserFactory.create()

    const projectIdea = await ProjectIdeaFactory.create()
    const newProjectIdea = await ProjectIdeaFactory.make()

    const response = await client
      .put(`/api/project_ideas/${projectIdea.id}`)
      .loginAs(user)
      .json(newProjectIdea)

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: MESSAGES.projectIdeaUpdateSuccess,
    })

    const updatedProjectIdea = await ProjectIdea.findOrFail(projectIdea.id)

    assert.equal(updatedProjectIdea.title, newProjectIdea.title)
    assert.equal(updatedProjectIdea.description, newProjectIdea.description)
    assert.equal(updatedProjectIdea.url, newProjectIdea.url)

    assert.exists(
      await AuditLog.query()
        .where('action', AuditLogAction.UPDATE)
        .where('user_id', user.id)
        .where('table', 'project_ideas')
    )
  })

  test('should delete a project idea', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const projectIdea = await ProjectIdeaFactory.create()

    const response = await client.delete(`/api/project_ideas/${projectIdea.id}`).loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: MESSAGES.projectIdeaDeleteSuccess,
    })

    assert.isNull(await ProjectIdea.find(projectIdea.id))

    assert.exists(
      await AuditLog.query()
        .where('action', AuditLogAction.DELETE)
        .where('user_id', user.id)
        .where('table', 'project_ideas')
    )
  })
})
