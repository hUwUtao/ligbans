import {
  litebans_bans as banTable,
  litebans_history as hist,
  litebans_kicks as kickTable,
  litebans_warnings as warnTable,
  litebans_mutes as muteTable,
} from "./db/schema";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import { and, desc, eq } from "drizzle-orm";
import { MySqlColumn, MySqlTable } from "drizzle-orm/mysql-core";

type TemplateTable = {
  id: MySqlColumn<any>;
  uuid: MySqlColumn<any>;
  banned_by_name: MySqlColumn<any>;
  reason: MySqlColumn<any>;
  time: MySqlColumn<any>;
  removed_by_date?: MySqlColumn<any>;
  removed_by_name?: MySqlColumn<any>;
  removed_by_reason?: MySqlColumn<any>;
  server_origin: MySqlColumn<any>;
  silent: MySqlColumn<any>;
} & MySqlTable;

type ListFuncTemplate<T, P> = (
  db: MySql2Database,
  left: TemplateTable
) => (p: P) => Promise<T[]>;

type LitebansListParameter = {
  exact?: string;
  offset: number;
  limit: number;
};

type LitebansListTemplate = {
  id: bigint;
  name: string;
  bannedBy?: string;
  reason?: string;
  time: bigint;
  expire?: Date;
  freedBy?: string;
  freedReason?: string;
  origin?: string;
};

/**
 * template to index banlist with paginator and filter
 */
const listTemplate: ListFuncTemplate<
  LitebansListTemplate,
  LitebansListParameter
> =
  (db, left) =>
  ({ offset = 0, limit = 1024, exact }) =>
    db
      .select({
        id: left.id,
        name: hist.name,
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
      .where(
        and(
          ...[
            //
            eq(left.silent, 0),
            exact && eq(hist.name, exact),
          ].filter(Boolean)
        )
      )
      .leftJoin(hist, eq(left.uuid, hist.uuid))
      .offset(offset)
      .limit(limit)
      .orderBy(desc(left.id))
      .execute();

/**
 *
 * @param db the drizzle database connection (mysql2)
 * @returns `{bans, mutes, warns, kicks}`
 */
export function connectLitebansDrizzle(db: MySql2Database) {
  return {
    bans: listTemplate(db, banTable),
    mutes: listTemplate(db, muteTable),
    warns: listTemplate(db, warnTable),
    kicks: listTemplate(db, kickTable),
  };
}

/**
 *
 * @param dburl drizzle format for database, currently, only mysql is implemented
 * @returns {typeof connectLitebansDrizzle}
 */
export default function connectLitebans(dburl: string) {
  const db = drizzle(dburl);
  return connectLitebansDrizzle(db);
}
