import { relations } from "drizzle-orm";
import { pgTable, serial, text, uuid, smallint, boolean, timestamp } from "drizzle-orm/pg-core";

const timestampsFields = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  ...timestampsFields
})

export const userRelations = relations(users, ({ many }) => ({
  ownedActivities: many(activities)
}))

export const activities = pgTable('activities', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  location: text('location'),
  people_amount: smallint('people_amount').notNull(),
  owner: uuid('owner').notNull(),
  isFree: boolean('free'),
  isPrivate: boolean('private'),
  ...timestampsFields
})

export const activityRelations = relations(activities, ({ one }) => ({
  owner: one(users, {
    fields: [activities.owner],
    references: [users.id]
  })
}))