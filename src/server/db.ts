import { env } from '@/env.mjs';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

const connectionString = env.DB_CONNECTION_URL
console.log({ connectionString })
console.log("Connection_string", connectionString)
const client = postgres(connectionString)

export const db = drizzle(client);
