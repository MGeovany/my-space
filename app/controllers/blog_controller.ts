import Blog from '#models/blog'
import { createBlogPostValidator } from '#validators/post_blog'
import type { HttpContext } from '@adonisjs/core/http'
import { MESSAGES } from '../constants/messages.js'
import { AuditLogAction } from '../constants/index.js'
import User from '#models/user'

export default class BlogController {
  public async index({ response }: HttpContext) {
    const blogs = await Blog.all()

    return response.ok({
      success: true,
      data: blogs,
    })
  }

  public async show({ response, params }: HttpContext) {
    const blog = await Blog.find(params.id)
    return response.ok({
      success: true,
      data: blog,
    })
  }

  public async store({ auth, request, response }: HttpContext) {
    const data = request.all()
    const payload = await createBlogPostValidator.validate(data)

    const blog = new Blog()
    blog.title = payload.title
    blog.content = payload.content
    await blog.save()

    const user = auth.user
    if (user) {
      const currentValue = blog.toObject()
      const description = `Blog created with title: ${blog.title}`
      const ipAddress = request.ip()
      const userId = user.id.toString()
      const table = 'blogs'

      await User.createAuditTrail(
        userId,
        ipAddress,
        AuditLogAction.CREATE,
        description,
        currentValue,
        undefined,
        table
      )
    }

    return response.created({
      success: true,
      message: MESSAGES.blogCreateSuccess,
    })
  }

  public async update({ params, request, response, auth }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)
    const data = request.only(['title', 'content'])
    const payload = await createBlogPostValidator.validate(data)

    const previousValue = blog.toObject()

    blog.merge(payload)
    await blog.save()

    const user = auth.user

    if (user) {
      const currentValue = blog.toObject()
      const description = `Blog updated with title: ${blog.title}`
      const ipAddress = request.ip()
      const userId = user.id.toString()

      await User.createAuditTrail(
        userId,
        ipAddress,
        AuditLogAction.UPDATE,
        description,
        currentValue,
        previousValue,
        Blog.table
      )
    }

    return response.ok({
      success: true,
      message: MESSAGES.blogUpdateSuccess,
    })
  }

  public async destroy({ params, response, request, auth }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)

    await blog.delete()

    const user = auth.user

    if (user) {
      const currentValue = blog.toObject()
      const description = `Blog deleted with title: ${blog.title}`
      const ipAddress = request.ip()
      const userId = user.id.toString()

      await User.createAuditTrail(
        userId,
        ipAddress,
        AuditLogAction.DELETE,
        description,
        currentValue,
        undefined,
        Blog.table
      )
    }
    return response.ok({
      success: true,
      message: MESSAGES.blogDeleteSuccess,
    })
  }
}
