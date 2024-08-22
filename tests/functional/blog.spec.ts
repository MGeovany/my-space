import Blog from '#models/blog'

import { test } from '@japa/runner'
import { MESSAGES } from '../../app/constants/messages.js'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#database/factories/user_factory'
import { BlogFactory } from '#database/factories/blog_factory'
import { AuditLogAction } from '../../app/constants/index.js'
import AuditLog from '#models/audit_log'

test.group('BlogController', (group) => {
  group.each.setup(async () => {
    group.each.setup(() => testUtils.db().withGlobalTransaction())
    group.each.setup(() => testUtils.db().truncate())
  })

  test('should return a list of blogs', async ({ client }) => {
    const blog = new Blog()
    blog.title = 'Sample Blog'
    blog.content = 'Sample Content'
    await blog.save()

    const response = await client.get('/api/blog')

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      data: [
        {
          id: blog.id,
          title: blog.title,
          content: blog.content,
        },
      ],
    })
  })

  test('should return a single blog by ID', async ({ client }) => {
    const blog = new Blog()
    blog.title = 'Sample Blog'
    blog.content = 'Sample Content'
    await blog.save()

    const response = await client.get(`api/blog/${blog.id}`)

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      data: {
        id: blog.id,
        title: blog.title,
        content: blog.content,
      },
    })
  })
  test('should create a new blog', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const newBlog = await BlogFactory.create()

    const response = await client.post('/api/blog').loginAs(user).json({
      title: newBlog.title,
      content: newBlog.content,
    })

    response.assertStatus(201)
    response.assertBodyContains({
      success: true,
      message: MESSAGES.blogCreateSuccess,
    })

    const blog = await Blog.findByOrFail('title', newBlog.title)
    assert.isNotNull(blog)
    response.assertBodyContains({
      success: true,
      message: MESSAGES.blogCreateSuccess,
    })
  })

  test('should update an existing blog and create an audit log', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const newBlog = await BlogFactory.create()

    const response = await client.put(`/api/blog/${newBlog.id}`).loginAs(user).json({
      title: 'Updated Title',
      content: 'Updated Content',
    })

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: MESSAGES.blogUpdateSuccess,
    })

    await newBlog.refresh()
    assert.equal(newBlog.title, 'Updated Title')

    assert.exists(
      await AuditLog.query()
        .where('action', AuditLogAction.UPDATE)
        .where('user_id', user.id)
        .where('table', 'blogs')
    )
  })

  test('should delete a blog and create an audit log', async ({ client, assert }) => {
    const user = await UserFactory.create()
    const newBlog = await BlogFactory.create()

    const response = await client.delete(`/api/blog/${newBlog.id}`).loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({
      success: true,
      message: MESSAGES.blogDeleteSuccess,
    })

    const deletedBlog = await Blog.find(newBlog.id)
    assert.isNull(deletedBlog)

    assert.exists(
      await AuditLog.query()
        .where('action', AuditLogAction.DELETE)
        .where('user_id', user.id)
        .where('table', 'blogs')
    )
  })
})
