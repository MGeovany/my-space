import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

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
    const { email, password, fullName } = request.only(['email', 'password', 'fullName'])

    const user = await User.create({
      email,
      password,
      fullName,
    })

    return response.ok({
      success: true,
      data: user,
    })
  }

  public async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.ok({
      success: true,
    })
  }
}
