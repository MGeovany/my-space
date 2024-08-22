import Bookmark from '#models/bookmark'
import User from '#models/user'
import { createBookmarkValidator } from '#validators/bookmark'
import type { HttpContext } from '@adonisjs/core/http'
import { AuditLogAction } from '../../app/constants/index.js'
import { MESSAGES } from '../../app/constants/messages.js'
import Blog from '#models/blog'

export default class BookmarksController {
  public async index({ response }: HttpContext) {
    const bookmarks = await Bookmark.all()

    return response.ok({
      success: true,
      data: bookmarks,
    })
  }

  public async show({ response, params }: HttpContext) {
    const bookmark = await Bookmark.find(params.id)

    return response.ok({
      success: true,
      data: bookmark,
    })
  }

  public async store({ response, request, auth }: HttpContext) {
    const data = request.all()
    const payload = await createBookmarkValidator.validate(data)

    const bookmark = new Bookmark()
    bookmark.title = payload.title
    bookmark.url = payload.url
    bookmark.description = payload.description
    bookmark.tag = payload.tag
    await bookmark.save()

    const user = auth.user
    if (user) {
      const currentValue = bookmark.toObject()
      const description = `Bookmark created with title: ${bookmark.title}`
      const ipAddress = request.ip()
      const userId = user.id.toString()

      await User.createAuditTrail(
        userId,
        ipAddress,
        AuditLogAction.CREATE,
        description,
        currentValue,
        undefined,
        Blog.table
      )
    }

    return response.created({
      success: true,
      message: MESSAGES.bookmarkCreateSuccess,
      data: bookmark,
    })
  }

  public async update({ auth, request, response, params }: HttpContext) {
    const data = request.all()
    const payload = await createBookmarkValidator.validate(data)

    const bookmark = await Bookmark.findOrFail(params.id)
    bookmark.title = payload.title
    bookmark.url = payload.url
    bookmark.description = payload.description
    bookmark.tag = payload.tag
    await bookmark.save()

    const user = auth.user
    if (user) {
      const currentValue = bookmark.toObject()
      const description = `Bookmark updated with title: ${bookmark.title}`
      const ipAddress = request.ip()
      const userId = user.id.toString()

      await User.createAuditTrail(
        userId,
        ipAddress,
        AuditLogAction.UPDATE,
        description,
        currentValue,
        undefined,
        Blog.table
      )
    }

    return response.ok({
      success: true,
      message: MESSAGES.bookmarkUpdateSuccess,
    })
  }

  // TODO - Delete all 'delete' requests and add a trash feature

  public async destroy({ params, response, request, auth }: HttpContext) {
    const bookmark = await Bookmark.findOrFail(params.id)
    await bookmark.delete()

    const user = auth.user
    if (user) {
      const currentValue = bookmark.toObject()
      const description = `Bookmark deleted with title: ${bookmark.title}`
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
      message: MESSAGES.bookmarkDeleteSuccess,
    })
  }
}
