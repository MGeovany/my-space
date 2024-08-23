import ProjectIdea from '#models/project_idea'
import User from '#models/user'
import { createProjectIdeaValidator } from '#validators/project_idea'
import type { HttpContext } from '@adonisjs/core/http'

import { AuditLogAction } from '../constants/index.js'
import { MESSAGES } from '../constants/messages.js'

export default class ProjectIdeasController {
  public async index({ response }: HttpContext) {
    const projectIdeas = await ProjectIdea.all()

    return response.ok({
      success: true,
      data: projectIdeas,
    })
  }

  public async show({ params, response }: HttpContext) {
    const projectIdea = await ProjectIdea.find(params.id)
    return response.ok({
      success: true,
      data: projectIdea,
    })
  }

  public async store({ request, response, auth }: HttpContext) {
    const data = request.all()
    const payload = await createProjectIdeaValidator.validate(data)

    const projectIdea = new ProjectIdea()
    projectIdea.title = payload.title
    projectIdea.description = payload.description

    projectIdea.url = payload.url
    await projectIdea.save()

    const user = auth.user
    if (user) {
      const currentValue = projectIdea.toObject()
      const description = `Project Idea created with title: ${projectIdea.title}`
      const userId = user.id.toString()
      const ipAddress = request.ip()

      await User.createAuditTrail(
        userId,
        ipAddress,
        AuditLogAction.CREATE,
        description,
        currentValue,
        undefined,
        ProjectIdea.table
      )
    }

    return response.created({
      success: true,
      message: MESSAGES.projectIdeaCreateSuccess,
      data: projectIdea,
    })
  }

  public async update({ request, response, params, auth }: HttpContext) {
    const data = request.all()
    const payload = await createProjectIdeaValidator.validate(data)

    const projectIdea = await ProjectIdea.findOrFail(params.id)
    projectIdea.title = payload.title
    projectIdea.description = payload.description
    projectIdea.url = payload.url
    await projectIdea.save()

    const user = auth.user
    if (user) {
      const currentValue = projectIdea.toObject()
      const description = `Project Idea updated with title: ${projectIdea.title}`
      const userId = user.id.toString()
      const ipAddress = request.ip()

      await User.createAuditTrail(
        userId,
        ipAddress,
        AuditLogAction.UPDATE,
        description,
        currentValue,
        undefined,
        ProjectIdea.table
      )
    }
    return response.ok({
      success: true,
      message: MESSAGES.projectIdeaUpdateSuccess,
      data: projectIdea,
    })
  }

  public async destroy({ params, response, request, auth }: HttpContext) {
    const projectIdea = await ProjectIdea.findOrFail(params.id)
    await projectIdea.delete()

    const user = auth.user
    if (user) {
      const currentValue = projectIdea.toObject()
      const description = `Project Idea deleted with title: ${projectIdea.title}`
      const ipAddress = request.ip()
      const userId = user.id.toString()
      const table = 'bookmarks'

      await User.createAuditTrail(
        userId,
        ipAddress,
        AuditLogAction.DELETE,
        description,
        undefined,
        currentValue,
        table
      )
    }

    return response.ok({
      success: true,
      message: MESSAGES.projectIdeaDeleteSuccess,
    })
  }
}
