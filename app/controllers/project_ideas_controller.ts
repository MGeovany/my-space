import ProjectIdea from '#models/project_idea'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProjectIdeasController {
  public async index({ response }: HttpContext) {
    const projectIdeas = await ProjectIdea.all()
    return response.ok(projectIdeas)
  }

  public async show({ params, response }: HttpContext) {
    const projectIdea = await ProjectIdea.find(params.id)
    return response.ok(projectIdea)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.all()

    const blog = new ProjectIdea()
    blog.title = data.title
    blog.description = data.description
    blog.stack = data.stack
    blog.url = data.url

    await blog.save()
    return response.created({
      success: true,
      data: blog,
    })
  }

  public async update({ request, response }: HttpContext) {
    const data = request.all()
    const projectIdea = await ProjectIdea.findOrFail(data.id)

    projectIdea.title = request.input('title')
    projectIdea.description = request.input('description')
    projectIdea.stack = request.input('stack')
    projectIdea.url = request.input('url')
    await projectIdea.save()
    return response.ok(projectIdea)
  }

  public async destroy({ params, response }: HttpContext) {
    const projectIdea = await ProjectIdea.findOrFail(params.id)
    await projectIdea.delete()
    return response.noContent()
  }
}
