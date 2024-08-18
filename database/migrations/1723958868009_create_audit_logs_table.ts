import { BaseSchema } from '@adonisjs/lucid/schema'
import { AuditLogAction } from 'app/constants/index.js'

export default class extends BaseSchema {
  protected tableName = 'audit_log'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .enum('action', Object.values(AuditLogAction), {
          useNative: true,
          enumName: 'audit_log_actions',
          existingType: false,
        })
        .notNullable()
      table.text('table').notNullable()
      table.text('source_ip_address')
      table.uuid('resource_id').notNullable().index()
      table.text('description')
      table.jsonb('previous_value')
      table.jsonb('current_value')
      table.uuid('user_id')
      table.timestamp('created_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "audit_log_actions" CASCADE')
  }
}
