import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { AuditLogAction } from '../constants/index.js'
import AuditLog from './audit_log.js'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  public static table = 'user'
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare auth0UserId: string | null

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static accessTokens = DbAccessTokensProvider.forModel(User)

  public static async createAuditTrail(
    userId: string,
    sourceIpAddress: string,
    action: AuditLogAction,
    description?: string | null,
    currentValue?: ModelObject,
    previousValue?: ModelObject,
    table?: string
  ) {
    await AuditLog.create({
      userId,
      action: action,
      resourceId: userId,
      table,
      previousValue,
      currentValue,
      description,
      sourceIpAddress,
    })
  }
}
