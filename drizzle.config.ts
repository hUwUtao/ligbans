import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'mysql',
    dbCredentials: {
        //@ts-ignore
        url: process.env.DATABASE_URL!,
    },
})
