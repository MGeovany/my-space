import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public async login({ request, auth }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const token = await auth.use('api').attempt(email, password)
      return { token }
    } catch {
      return { error: 'Invalid credentials' }
    }
  }
}
