import { text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";
import { userTable } from "./user.schema";



export const addressTable = pgTable('user_address',{

    id : uuid('id').defaultRandom().primaryKey(),
    userId : uuid('userId').references(() => userTable.id, { onDelete : 'cascade' }).notNull(),

    name: varchar("name", { length: 255 }),
    phone: varchar("phone", { length: 15 }),
    line1: text("line1").notNull(),
    line2: text("line2"),

    city: varchar("city", { length: 100 }),
    state: varchar("state", { length: 100 }),
    pincode: varchar("pincode", { length: 20 }),
    country: varchar("country", { length: 100 }),

    createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

    deletedAt: timestamp('deleted_at', { withTimezone: true })
})