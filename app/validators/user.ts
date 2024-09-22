import vine from '@vinejs/vine'

/**
 * Validates the user creation action
 */

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    auth0UserId: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const user = await db.from('user').where('auth_0_user_id', value).first()
        return !user
      }),
    email: vine.string().unique(async (db, value) => {
      const user = await db.from('user').where('email', value).first()
      return !user
    }),
  })
)
