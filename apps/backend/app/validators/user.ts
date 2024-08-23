import vine from '@vinejs/vine'

/**
 * Validates the user creation action
 */

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    password: vine.string().trim().minLength(6),
    email: vine.string().unique(async (db, value) => {
      const user = await db.from('users').where('email', value).first()
      return !user
    }),
  })
)
