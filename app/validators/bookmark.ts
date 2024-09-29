import vine from '@vinejs/vine'
import { BookmarkTag } from '../constants/index.js'

/**
 * Validates the bookmark creation action
 */

export const createBookmarkValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    url: vine.string().trim().url(),
    description: vine.string().trim(),
    tag: vine.enum(BookmarkTag),
  })
)
