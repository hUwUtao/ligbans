import { MySql2Database } from 'drizzle-orm/mysql2'
import {
  litebans_bans as banTable,
  litebans_history as hist,
  litebans_kicks as kickTable,
  litebans_warnings as warnTable,
  litebans_mutes as muteTable,
} from './db/schema'
import { desc, sql } from 'drizzle-orm'
import { MySqlColumn, MySqlTable } from 'drizzle-orm/mysql-core'
import { db } from './db'

type TemplateTable = {
  id: MySqlColumn<any>
  uuid: MySqlColumn<any>
  banned_by_name: MySqlColumn<any>
  reason: MySqlColumn<any>
  time: MySqlColumn<any>
  removed_by_date?: MySqlColumn<any>
  removed_by_name?: MySqlColumn<any>
  removed_by_reason?: MySqlColumn<any>
  server_origin: MySqlColumn<any>
  silent: MySqlColumn<any>
} & MySqlTable

type ListFuncTemplate<T> = (
  db: MySql2Database,
  left: TemplateTable
) => () => Promise<T[]>

type LitebansListTemplate = {
  id: bigint
  bannedBy?: string
  reason?: string
  time: bigint
  expire?: Date
  freedBy?: string
  freedReason?: string
  origin?: string
}

const listTemplate: ListFuncTemplate<LitebansListTemplate> =
  (db, left) =>
  (offset: number = 0, limit: number = 1024) =>
    db
      .select({
        id: left.id,
        byName: left.banned_by_name,
        reason: left.reason,
        time: left.time,
        origin: left.server_origin,
        ...(left.removed_by_date &&
        left.removed_by_name &&
        left.removed_by_reason
          ? {
              expire: left.removed_by_date,
              freedBy: left.removed_by_name,
              freedReason: left.removed_by_reason,
            }
          : {}),
      })
      .from(left)
      .where(sql`${left.silent} = ${0}`)
      .leftJoin(hist, sql`${hist.uuid} = ${left.uuid}`)
      .offset(offset)
      .limit(limit)
      .orderBy(desc(left.id))
      .execute()

export const bans = listTemplate(db, banTable)
export const mutes = listTemplate(db, muteTable)
export const warns = listTemplate(db, warnTable)
export const kicks = listTemplate(db, kickTable)

// export async function bans(db: MySql2Database) {
//     return await db
//         .select({
//             id: bant.id,
//             byName: bant.banned_by_name,
//             reason: bant.reason,
//             time: bant.time,
//             expire: bant.removed_by_date,
//             by: bant.removed_by_name,
//         })
//         .from(bant)
//         .where(sql`${bant.silent} = ${0}`)
//         .innerJoin(hist, sql`${hist.uuid} = ${bant.uuid}`)
//         .execute()
// }
// export async function mutes(db: MySql2Database) {
//     return await db
//         .select({
//             id: bant.id,
//             byName: bant.banned_by_name,
//             reason: bant.reason,
//             time: bant.time,
//             expire: bant.removed_by_date,
//             by: bant.removed_by_name,
//         })
//         .from(mutt)
//         .where(sql`${bant.silent} = ${0}`)
//         .innerJoin(hist, sql`${hist.uuid} = ${bant.uuid}`)
//         .execute()
// }
