import User from '#models/user'

declare module '@adonisjs/core/http' {
  interface HttpContextContract {
    loggedInUser?: User | null
  }
}
