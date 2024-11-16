import { sql } from 'drizzle-orm'
import {
  bigint,
  binary,
  // boolean,
  // char,
  datetime,
  int,
  mysqlTable,
  varchar,
} from 'drizzle-orm/mysql-core'

export const litebans_allow = mysqlTable('litebans_allow', {
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey().autoincrement(),
  uuid: binary('uuid', { length: 16 }).notNull().unique(),
  type: int('type').notNull(),
})

export const litebans_bans = mysqlTable('litebans_bans', {
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 191 }),
  ip: varchar('ip', { length: 191 }),
  reason: varchar('reason', { length: 191 }),
  banned_by_uuid: varchar('banned_by_uuid', { length: 191 }).notNull(),
  banned_by_name: varchar('banned_by_name', { length: 191 }),
  removed_by_uuid: varchar('removed_by_uuid', { length: 191 }),
  removed_by_name: varchar('removed_by_name', { length: 191 }),
  removed_by_reason: varchar('removed_by_reason', { length: 191 }),
  removed_by_date: datetime('removed_by_date', { fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  time: bigint('time', { mode: 'bigint' }).notNull(),
  until: bigint('until', { mode: 'bigint' }).notNull(),
  template: int('template').notNull().default(255),
  server_scope: varchar('server_scope', { length: 191 }),
  server_origin: varchar('server_origin', { length: 191 }),
  silent: binary('silent').notNull(),
  ipban: binary('ipban').notNull(),
  ipban_wildcard: binary('ipban_wildcard')
    .notNull()
    .default(sql`(b'0')`),
  active: binary('active').notNull(),
})

export const litebans_config = mysqlTable('litebans_config', {
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey().autoincrement(),
  version: varchar('version', { length: 191 }).notNull(),
  build: varchar('build', { length: 191 }).notNull(),
  timezone: varchar('timezone', { length: 191 }).notNull().default('+00:00'),
})

export const litebans_history = mysqlTable('litebans_history', {
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey().autoincrement(),
  date: datetime('date', { fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  name: varchar('name', { length: 191 }),
  uuid: varchar('uuid', { length: 191 }),
  ip: varchar('ip', { length: 191 }),
})

export const litebans_kicks = mysqlTable('litebans_kicks', {
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 191 }),
  ip: varchar('ip', { length: 191 }),
  reason: varchar('reason', { length: 191 }),
  banned_by_uuid: varchar('banned_by_uuid', { length: 191 }).notNull(),
  banned_by_name: varchar('banned_by_name', { length: 191 }),
  time: bigint('time', { mode: 'bigint' }).notNull(),
  until: bigint('until', { mode: 'bigint' }).notNull(),
  template: int('template').notNull().default(255),
  server_scope: varchar('server_scope', { length: 191 }),
  server_origin: varchar('server_origin', { length: 191 }),
  silent: binary('silent').notNull(),
  ipban: binary('ipban').notNull(),
  ipban_wildcard: binary('ipban_wildcard')
    .notNull()
    .default(sql`(b'0')`),
  active: binary('active').notNull(),
})

export const litebans_mutes = mysqlTable('litebans_mutes', {
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 191 }),
  ip: varchar('ip', { length: 191 }),
  reason: varchar('reason', { length: 191 }),
  banned_by_uuid: varchar('banned_by_uuid', { length: 191 }).notNull(),
  banned_by_name: varchar('banned_by_name', { length: 191 }),
  removed_by_uuid: varchar('removed_by_uuid', { length: 191 }),
  removed_by_name: varchar('removed_by_name', { length: 191 }),
  removed_by_reason: varchar('removed_by_reason', { length: 191 }),
  removed_by_date: datetime('removed_by_date', { fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  time: bigint('time', { mode: 'bigint' }).notNull(),
  until: bigint('until', { mode: 'bigint' }).notNull(),
  template: int('template').notNull().default(255),
  server_scope: varchar('server_scope', { length: 191 }),
  server_origin: varchar('server_origin', { length: 191 }),
  silent: binary('silent').notNull(),
  ipban: binary('ipban').notNull(),
  ipban_wildcard: binary('ipban_wildcard')
    .notNull()
    .default(sql`(b'0')`),
  active: binary('active').notNull(),
})

export const litebans_servers = mysqlTable('litebans_servers', {
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey().autoincrement(),
  name: varchar('name', { length: 191 }).notNull(),
  uuid: varchar('uuid', { length: 191 }).notNull(),
  date: datetime('date', { fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const litebans_sync = mysqlTable('litebans_sync', {
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey().autoincrement(),
  info: int('info').notNull(),
  msg: varchar('msg', { length: 191 }).notNull(),
  time: datetime('time', { fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const litebans_warnings = mysqlTable('litebans_warnings', {
  id: bigint('id', { mode: 'bigint' }).notNull().primaryKey().autoincrement(),
  uuid: varchar('uuid', { length: 191 }),
  ip: varchar('ip', { length: 191 }),
  reason: varchar('reason', { length: 191 }),
  banned_by_uuid: varchar('banned_by_uuid', { length: 191 }).notNull(),
  banned_by_name: varchar('banned_by_name', { length: 191 }),
  removed_by_uuid: varchar('removed_by_uuid', { length: 191 }),
  removed_by_name: varchar('removed_by_name', { length: 191 }),
  removed_by_reason: varchar('removed_by_reason', { length: 191 }),
  removed_by_date: datetime('removed_by_date', { fsp: 3 })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  time: bigint('time', { mode: 'bigint' }).notNull(),
  until: bigint('until', { mode: 'bigint' }).notNull(),
  template: int('template').notNull().default(255),
  server_scope: varchar('server_scope', { length: 191 }),
  server_origin: varchar('server_origin', { length: 191 }),
  silent: binary('silent').notNull(),
  ipban: binary('ipban').notNull(),
  ipban_wildcard: binary('ipban_wildcard')
    .notNull()
    .default(sql`(b'0')`),
  active: binary('active').notNull(),
  warned: binary('warned').notNull(),
})
