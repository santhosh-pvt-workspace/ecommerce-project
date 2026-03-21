import { integer, pgTable, serial, unique, uuid, varchar } from 'drizzle-orm/pg-core';
import { userTable } from '@/database/schema/user.schema';
import { pgEnum } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { productTable } from './product.schema';
import { numeric } from 'drizzle-orm/pg-core';
import { index } from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', ['active', 'ordered', 'abandoned']);

export const cartTable = pgTable('carts', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id').references(() => userTable.id, {
    onDelete: 'set null',
  }),
  sessionId: varchar('session_id', { length: 255 }),

  status: statusEnum().default('active'),

  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),

  deletedAt: timestamp('deleted_at', { withTimezone: true })
},

(table) => [
    index('idx_carts_user_id').on(table.userId),
    index('idx_carts_session_id').on(table.sessionId)
]);

export const cartItemTable = pgTable(
  'cart_items',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    cartId: uuid('cart_id')
      .references(() => cartTable.id, {
        onDelete: 'cascade',
      })
      .notNull(),

    productId: uuid('product_id')
      .references(() => productTable.id)
      .notNull(),

    quantity: integer('quantity').notNull(),
    priceSnapshot: numeric('price_snapshot', { precision : 10, scale : 2, mode : "string"}).notNull(),

    createdAt: timestamp('created_at', { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),

    deletedAt: timestamp('deleted_at', { withTimezone: true })
  },

  (table) => [
    index('cart_items_cart_id').on(table.cartId),
    unique().on(table.cartId, table.productId),
  ]
);
