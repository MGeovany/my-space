import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

import { ModelObject } from '@adonisjs/lucid/types/model'
import { AuditLogAction } from 'app/constants/index.js'

export default class AuditLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare action: AuditLogAction
  @column()
  declare resourceId: string

  @column()
  declare sourceIpAddress: string

  @column({
    prepare: (value: ModelObject) => value && JSON.stringify(value),
  })
  declare previousValue: ModelObject | undefined

  @column({
    prepare: (value: ModelObject) => value && JSON.stringify(value),
  })
  declare currentValue: ModelObject | undefined

  @column()
  declare table: string

  @column()
  declare description: string | null

  @column()
  declare userId: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
}
