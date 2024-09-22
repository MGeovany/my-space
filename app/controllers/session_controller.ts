import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { MESSAGES } from '../constants/messages.js'

export default class SessionController {
  public async login({ response, request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      if (!user) {
        return response.unauthorized({
          success: false,
          message: MESSAGES.invalidCredentials,
        })
      }

      const token = await User.accessTokens.create(user)

      return response.json({
        token: token.value!.release(),
        userId: user.id,
      })
    } catch {
      return response.unauthorized({
        success: false,
        message: MESSAGES.invalidCredentials,
      })
    }
  }

  public async signup({ response, request }: HttpContext) {
    const { email, fullName, auth0UserId } = await createUserValidator.validate(request.all())

    const user = await User.findBy('email', email)

    if (user) {
      return response.badRequest({
        success: false,
        message: MESSAGES.userExists,
      })
    }

    const newUser = new User()
    newUser.email = email
    newUser.auth0UserId = auth0UserId
    newUser.fullName = fullName
    await newUser.save()

    return response.send({
      success: true,
      message: MESSAGES.userCreateSuccess,
      data: newUser,
    })
  }

  public async getToken({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const token = await User.accessTokens.create(user)

    return {
      type: 'bearer',
      value: token.value!.release(),
    }
  }

  public async logout({ response }: HttpContext) {
    // await auth.use('web').logout()

    return response.ok({
      success: true,
      message: MESSAGES.userLoggedOut,
    })
  }
}
