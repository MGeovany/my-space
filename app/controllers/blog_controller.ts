import Blog from '#models/blog'
import type { HttpContext } from '@adonisjs/core/http'

export default class BlogController {
  public async index({ response }: HttpContext) {
    const blogs = await Blog.all()
    console.log(blogs, 'ngl')

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
