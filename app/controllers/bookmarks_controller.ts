import Bookmark from '#models/bookmark'
import type { HttpContext } from '@adonisjs/core/http'

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

  public async store({ response, request }: HttpContext) {
    const data = request.all()
    const bookmark = new Bookmark()
    bookmark.title = data.title
    bookmark.url = data.url
    bookmark.description = data.description
    bookmark.tag = data.tag
    await bookmark.save()
    return response.created({
      success: true,
      data: bookmark,
    })
  }

  public async update({ request }: HttpContext) {
    const data = request.all()
    const bookmark = await Bookmark.findOrFail(data.id)
    bookmark.title = data.title
    bookmark.url = data.url
    bookmark.description = data.description
    bookmark.tag = data.tag
    await bookmark.save()
    return {
      success: true,
      data: bookmark,
    }
  }

  public async destroy({ request }: HttpContext) {
    const data = request.all()
    const bookmark = await Bookmark.findOrFail(data.id)
    await bookmark.delete()
    return {
      success: true,
    }
  }
}
