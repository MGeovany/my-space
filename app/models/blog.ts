import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import BaseUuidModel from './base_uuid_model.js'

export default class Blog extends BaseUuidModel {
  @column()
  declare title: string

  @column()
  declare content: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
