import Blog from '#models/blog'
import type { HttpContext } from '@adonisjs/core/http'

export default class BlogController {
  public async index({ response }: HttpContext) {
    return response.ok({
      success: true,
      data: Blog.all(),
    })
  }

  public async show({ response, params }: HttpContext) {
    return response.ok({
      success: true,
      data: Blog.find(params.id),
    })
  }

  public async store({ request, response }: HttpContext) {
    const data = request.all()
    const blog = new Blog()
    blog.title = data.title
    blog.content = data.content
    await blog.save()
    return response.created({
      success: true,
      data: blog,
    })
  }

  public async update({ params, request }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)
    const data = request.only(['title', 'content'])
    blog.merge(data)
    await blog.save()
    return blog
  }

  public async destroy({ params }: HttpContext) {
    const blog = await Blog.findOrFail(params.id)
    await blog.delete()
    return {
      success: true,
    }
  }
}
