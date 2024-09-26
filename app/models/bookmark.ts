import { DateTime } from 'luxon'
import { column } from '@adonisjs/lucid/orm'
import { BookmarkTag } from '../constants/index.js'
import BaseUuidModel from './base_uuid_model.js'

export default class Bookmark extends BaseUuidModel {
  @column()
  declare title: string

  @column()
  declare url: string

  @column()
  declare description: string

  @column()
  declare tag: BookmarkTag

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
