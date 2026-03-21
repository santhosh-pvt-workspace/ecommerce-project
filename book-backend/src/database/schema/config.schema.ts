import { timestamp, uuid } from "drizzle-orm/pg-core";
import { serial, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";



export const categoryTable = pgTable('cfg_category', {
    id: uuid("id").defaultRandom().primaryKey(),
    name : varchar('name', { length : 50 }).notNull(),
    code : varchar('code', { length : 10}).notNull(),

    createdAt : timestamp('created_at', { mode : "date", withTimezone : true }).defaultNow().notNull(),
})