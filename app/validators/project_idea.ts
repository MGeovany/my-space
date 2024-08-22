import vine from '@vinejs/vine'

/**
 * Validates the bookmark creation action
 */

export const createProjectIdeaValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(6),
    description: vine.string().trim().minLength(6),
    url: vine.string().trim().url(),
  })
)
