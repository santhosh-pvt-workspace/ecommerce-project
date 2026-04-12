import { boolean, numeric, pgEnum, uuid } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const promotionLabelEnum = pgEnum('promotion_label', [
    'New Arrival',
    'Best Seller',
    'Clearance',
    'Hot Deal',
    'Limited Edition',
]);

export const productTable = pgTable('products', {

    id: uuid("id").defaultRandom().primaryKey(),
    productName: varchar('product_name', { length: 255 }).notNull(),
    description: text('description'),
    imageUrl: varchar('image_url'),
    imagePublicId: varchar('image_public_id'),

    price: numeric('price', { precision: 10, scale: 2, mode: "string" }).notNull(),
    stock: integer('stock').notNull(),

    offerPercentage: integer('offer_percentage').default(0),
    isActive: boolean('is_active').default(true),

    soldBy: varchar('sold_by', { length: 255 }),
    promotionLabel: promotionLabelEnum('promotion_label'),
    brand: varchar('brand', { length: 255 }),
    ingredients: text('ingredients'),
    rating: numeric('rating', { precision: 2, scale: 1 }).default('0'),
    tags: text('tags').array(),
    specialFor: text('special_for'),

    categoryId: uuid('category_id'),

    createdAt: timestamp('created_at', { mode: "date", withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow(),
},
    (table) => [
        index('idx_product_category_id').on(table.categoryId)
    ]);