import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { ModelObject } from '@adonisjs/lucid/types/model'
import { AuditLogAction } from '../constants/index.js'
import { DateTime } from 'luxon'
import AuditLog from './audit_log.js'
import { uuidv4 } from '../utils/index.js'

export default class BaseUuidModel extends BaseModel {
  public static selfAssignPrimaryKey = true

  @beforeCreate()
  public static async createUUID(baseModel: BaseUuidModel) {
    baseModel.id = uuidv4()
  }

  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

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
