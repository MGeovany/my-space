import vine from '@vinejs/vine'

/**
 * Validates the post's creation action
 */

export const createBlogPostValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    content: vine.string().trim().escape(),
  })
)
