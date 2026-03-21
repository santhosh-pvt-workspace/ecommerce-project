import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { ordersTable } from "./order.schema";
import { pgEnum } from "drizzle-orm/pg-core";

export const paymentStatusEnum = pgEnum('payment_status', ["paid", "pending", "failed"])

export const paymentTable = pgTable('payments', {
    id : uuid('id').defaultRandom().primaryKey(),
    orderId : uuid('order_id').references(() => ordersTable.id),

    provider : varchar('provider', { length : 50 }).notNull(),
    paymentId : varchar('payment_id', { length: 255}),
    
    status : paymentStatusEnum('status').default('pending')
})