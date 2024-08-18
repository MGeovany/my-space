import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Blog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
  static id: any

  /*  public static async createAuditTrail(
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
  } */
}
