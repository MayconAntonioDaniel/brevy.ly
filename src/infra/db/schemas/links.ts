import { randomUUID } from 'node:crypto'
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const uploads = pgTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  url: text('url').notNull().unique(),
  remoteKey: text('remote_key').notNull().unique(),
  remoteUrl: text('remote_url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
