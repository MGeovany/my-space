import User from '#models/user'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { decodeAuth0Jwt } from '../../app/utils/index.js'
import jwt from 'jsonwebtoken'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response, session } = ctx

    const tokenHeader = request.header('Authorization')

    if (!tokenHeader) {
      return response.unauthorized({
        success: false,
        message: 'Unauthorized access',
      })
    }

    const verifyToken = () => {
      return new Promise((resolve, reject) => {
        const token = tokenHeader.split(' ')[1]

        if (!token) {
          return reject(new Error('Token not found'))
        }

        try {
          const token = tokenHeader.split(' ')[1]
          const decodedHeader = jwt.decode(token, { complete: true })?.header

          if (!decodedHeader) {
            return reject(new Error('Invalid token structure'))
          }
          const { getKey } = decodeAuth0Jwt()
          jwt.verify(
            token,
            getKey,
            {
              algorithms: ['RS256'],
              audience: env.get('AUTH0_AUDIENCE'),
            },
            (err, res) => {
              if (err) {
                reject(err)
              } else {
                return resolve(res!.sub as string)
              }
            }
          )
        } catch (error) {
          return response.forbidden({
            success: false,
            message: 'Invalid token',
          })
        }
      })
    }

    try {
      const data = await verifyToken()

      // const auth0UserId = (data as string).split('|')[1]
      const user = await User.findBy('auth_0_user_id', data)

      if (!user) {
        return response.unauthorized({
          success: false,
          message: 'User not found',
        })
      }
      session.put('user', user)
    } catch (error) {
      return response.forbidden({
        success: false,
        message: 'Invalid token',
      })
    }
    await next()
  }
}
