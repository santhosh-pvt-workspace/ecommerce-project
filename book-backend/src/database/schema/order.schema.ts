import { index, integer, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { userTable } from './user.schema';
import { addressTable } from './address.schema';
import { pgEnum } from 'drizzle-orm/pg-core';
import { numeric } from 'drizzle-orm/pg-core';
import { productTable } from './product.schema';

export const orderStatusEnum = pgEnum('order_status', [
  'pending', // order created, waiting for payment
  'confirmed', // payment successful / order accepted
  'processing', // preparing / packing
  'shipped', // dispatched
  'out_for_delivery', // with delivery agent
  'delivered', // completed successfully

  'cancelled', // cancelled by user/admin
  'failed', // payment failed
  'returned', // returned after delivery
  'refunded', // money returned
]);

export const ordersTable = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => userTable.id),
  addressId: uuid('address_id').references(() => addressTable.id),

  orderStatus: orderStatusEnum('order_status').default('pending'),
  totalAmount: numeric('total_amount', {
    precision: 10,
    scale: 2,
    mode: 'string',
  }),

  createdAt: timestamp('created_at', { mode: 'date', withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),

  deletedAt: timestamp('deleted_at', { withTimezone: true })
},
(table) => [
    index('idx_order_user_id').on(table.userId)
]
);


export const orderItemTable = pgTable('order_items', {
    id : uuid('id').defaultRandom().primaryKey(),
    orderId : uuid('order_id').references(() => ordersTable.id, { onDelete : "cascade"}),
    productId : uuid('product_id').references(() => productTable.id),

    quantity : integer('quantity').notNull().default(1),
    priceSnapshot : numeric('price_snapshot', { precision : 10, scale : 2, mode : 'string'}),

    deletedAt: timestamp('deleted_at', { withTimezone: true })
},

(table) => [
    index('idx_order_item_order_id').on(table.orderId)
]);