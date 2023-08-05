import type { Config } from "drizzle-kit";
import "dotenv/config";

if (!process.env.DB_CONNECTION_URL) {
  throw new Error('DATABASE_URL is missing')
}

export default {
  connectionString: process.env.DB_CONNECTION_URL,
  schema: ["./src/db/schema.ts"],
  out: './src/drizzle-migrations',
} satisfies Config;
