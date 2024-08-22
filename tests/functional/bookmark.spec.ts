import { BookmarkFactory } from '#database/factories/bookmark_factory'
import { UserFactory } from '#database/factories/user_factory'
import AuditLog from '#models/audit_log'
import Bookmark from '#models/bookmark'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'
import { AuditLogAction } from '../../app/constants/index.js'
import { MESSAGES } from '../../app/constants/messages.js'

test.group('Bookmark controller', (group) => {
  group.each.setup(async () => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())
    group.each.setup(() => testUtils.db().truncate())
  })

  test('should return a list of bookmarks', async ({ client }) => {
    const bookmark = await BookmarkFactory.create()

    const response = await client.get('/api/bookmark')

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      data: [
        {
          id: bookmark.id,
          title: bookmark.title,
          url: bookmark.url,
          description: bookmark.description,
          tag: bookmark.tag,
        },
      ],
    })
  })

  test('should return a single bookmark by ID', async ({ client }) => {
    const bookmark = await BookmarkFactory.create()

    const response = await client.get(`/api/bookmark/${bookmark.id}`)

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      data: {
        id: bookmark.id,
        title: bookmark.title,
        url: bookmark.url,
        description: bookmark.description,
        tag: bookmark.tag,
      },
    })
  })

  test('should create a new bookmark', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const newBookmark = await BookmarkFactory.make()

    const response = await client.post('/api/bookmark').loginAs(user).json(newBookmark)

    response.assertStatus(201)
    response.assertBodyContains({
      success: true,
      messages: MESSAGES.bookmarkCreateSuccess,
    })
    const bookmark = await Bookmark.findByOrFail('title', newBookmark.title)
    assert.isNotNull(bookmark)

    assert.exists(
      await AuditLog.query()
        .where('action', AuditLogAction.CREATE)
        .where('user_id', user.id)
        .where('table', 'bookmarks')
    )
  })

  test('should update a bookmark', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const bookmark = await BookmarkFactory.create()
    const newBookmark = await BookmarkFactory.make()

    const response = await client
      .put(`/api/bookmark/${bookmark.id}`)
      .loginAs(user)
      .json(newBookmark)

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      messages: MESSAGES.bookmarkUpdateSuccess,
    })

    const updatedBookmark = await Bookmark.findOrFail(bookmark.id)
    assert.equal(updatedBookmark.title, newBookmark.title)
    assert.equal(updatedBookmark.url, newBookmark.url)
    assert.equal(updatedBookmark.description, newBookmark.description)
    assert.equal(updatedBookmark.tag, newBookmark.tag)

    assert.exists(
      await AuditLog.query()
        .where('action', AuditLogAction.UPDATE)
        .where('user_id', user.id)
        .where('table', 'bookmarks')
    )
  })

  test('should delete a bookmark', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const bookmark = await BookmarkFactory.create()

    const response = await client.delete(`/api/bookmark/${bookmark.id}`).loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: MESSAGES.bookmarkDeleteSuccess,
    })

    assert.isNull(await Bookmark.find(bookmark.id))

    assert.exists(
      await AuditLog.query()
        .where('action', AuditLogAction.DELETE)
        .where('user_id', user.id)
        .where('table', 'bookmarks')
    )
  })
})
