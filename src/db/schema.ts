import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

// Keep the existing messages table
export const messages = sqliteTable('messages', {
  // table name matches variable name
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull(),
  message: text('message').notNull(),
  systemInfo: text('system_info').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
