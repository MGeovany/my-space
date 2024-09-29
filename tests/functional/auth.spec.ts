import User from '#models/user'

import { test } from '@japa/runner'
import baseUser from './fixtures/auth.json' assert { type: 'json' }
import { UserFactory } from '#database/factories/user_factory'
import testUtils from '@adonisjs/core/services/test_utils'
import { MESSAGES } from '../../app/constants/messages.js'

test.group('Auth Apis', (group) => {
  group.each.setup(async () => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())
    group.each.setup(() => testUtils.db().truncate())
  })

  test('assert register api creates a user successfully', async ({ assert, client }) => {
    const response = await client.post('/api/session/signup').json(baseUser)

    response.assertStatus(200)
    await User.findByOrFail('email', baseUser.email)

    assert.deepEqual(response.body().data.email, baseUser.email)
    assert.deepEqual(response.body().message, MESSAGES.userCreateSuccess)
  })

  /* test('assert login api logs in a user successfully', async ({ assert, client }) => {
    const user = await UserFactory.merge({
      email: 'test1@test.local',
      password: 'password',
    }).create()

    const response = await client
      .post('/api/session')
      .json({ email: 'test1@test.local', password: 'password' })

    response.assertStatus(200)
    assert.deepEqual(response.body().data.email, user.email)
  }) */

  test('assert login api fails authentication for incorrect password', async ({
    assert,
    client,
  }) => {
    await UserFactory.merge({ email: 'test2@test.local' }).create()
    await User.query().where('email', 'test2@test.local').update({ password: 'password' })
    const response = await client
      .post('/api/session')
      .json({ email: 'test2@test.local', password: 'wrong' })
    response.assertStatus(400)
    const expectedResponse = {
      errors: [{ message: 'Invalid user credentials' }],
    }
    assert.deepEqual(response.body(), expectedResponse)
  })

  test('asset logout api logs out a user successfully', async ({ assert, client }) => {
    const user = await UserFactory.create()
    const response = await client.post('/api/session/logout').loginAs(user).send()

    response.assertStatus(200)

    assert.deepEqual(response.body().success, true)
    assert.deepEqual(response.body().message, MESSAGES.userLoggedOut)
  })
})
