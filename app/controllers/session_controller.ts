import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { MESSAGES } from '../constants/messages.js'

export default class SessionController {
  public async login({ response, request, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)

    return response.ok({
      success: true,
      data: user,
    })
  }

  public async signup({ response, request }: HttpContext) {
    const { email, password, fullName } = await createUserValidator.validate(request.all())

    const user = await User.create({
      email,
      password,
      fullName,
    })

    return response.send({
      success: true,
      message: MESSAGES.userCreateSuccess,
      data: user,
    })
  }

  public async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.ok({
      success: true,
      message: MESSAGES.userLoggedOut,
    })
  }
}
