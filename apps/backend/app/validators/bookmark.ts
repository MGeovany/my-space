import vine from '@vinejs/vine'
import { BookmarkTag } from '../constants/index.js'

/**
 * Validates the bookmark creation action
 */

export const createBookmarkValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    url: vine.string().trim().url(),
    description: vine.string().trim().minLength(6),
    tag: vine.enum(BookmarkTag),
  })
)
