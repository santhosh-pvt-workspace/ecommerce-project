import { index } from 'drizzle-orm/pg-core';
import { pgEnum, uuid } from 'drizzle-orm/pg-core';
import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'user']);

export const userTable = pgTable('users', {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar('name', { length: 150 }).notNull(),
  email: varchar('email', { length: 150 }).notNull().unique(),

  role: roleEnum('role').notNull().default('user'),

  passwordHash: varchar('password_hash'),
  google_id: varchar('google_id'),

  mobileNumber: varchar('mobile_number', { length: 15 }).notNull(),

  createdAt : timestamp('created_at', { mode : "date", withTimezone : true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),

  isActive: boolean('is_active').default(true),
  isVerified : boolean('is_verified').notNull(), // for checking guest to authenticated user

  last_login_at: timestamp('last_login_at').defaultNow(),
},

(table) => [
  index('idx_user_email').on(table.email)
]);
 