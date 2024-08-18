import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { AuditLogAction } from '../constants/index.js'
import AuditLog from './audit_log.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  public static async createAuditTrail(
    userId: string,
    sourceIpAddress: string,
    action: AuditLogAction,
    description?: string | null,
    currentValue?: ModelObject,
    previousValue?: ModelObject
  ) {
    await AuditLog.create({
      userId,
      action: action,
      resourceId: userId,
      table: this.table,
      previousValue,
      currentValue,
      description,
      sourceIpAddress,
    })
  }
}
