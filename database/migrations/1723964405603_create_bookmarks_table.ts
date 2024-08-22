import { BaseSchema } from '@adonisjs/lucid/schema'
import { BookmarkTag } from '../../app/constants/index.js'

export default class extends BaseSchema {
  protected tableName = 'bookmarks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('url').notNullable()
      table.text('description').notNullable()
      table
        .enum('tag', Object.values(BookmarkTag), {
          useNative: true,
          enumName: 'bookmark_tags',
          existingType: false,
        })
        .notNullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "audit_log_actions" CASCADE')
  }
}
