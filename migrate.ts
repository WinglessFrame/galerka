// migrate.ts
import { config } from 'dotenv';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
config({ path: '.env' });

console.log(process.env.DB_CONNECTION_URL);
const databaseUrl = drizzle(postgres(`${process.env.DB_CONNECTION_URL as string}`,
  { ssl: 'require', max: 1 }));

const main = async () => {
  try {
    await migrate(databaseUrl, { migrationsFolder: 'src/drizzle-migrations' });
    console.log('Migration complete');
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

void main();