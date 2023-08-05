import { pgTable, serial, timestamp, text } from "drizzle-orm/pg-core";

export const example = pgTable('example', {
  id: serial('id').primaryKey(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
  name: text('name').notNull(),
});
