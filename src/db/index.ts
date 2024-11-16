import 'dotenv/config'
import { drizzle } from 'drizzle-orm/mysql2'
export const db = drizzle(
  // @ts-ignore: im sorry
  process.env.DATABASE_URL
)
