import { boolean, numeric, uuid } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { index } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { text } from "drizzle-orm/pg-core";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";



export const productTable = pgTable('products', {

    id: uuid("id").defaultRandom().primaryKey(),
    title : varchar('title', { length : 50 }).notNull(),
    description : text('description'),
    imageUrl : varchar('image_url'),

    price : numeric('price', { precision : 10, scale : 2, mode : "string" }).notNull(),
    stock : integer('stock').notNull(),

    offerPercentage : integer('offer_percentage').default(0),
    isActive : boolean('is_active').default(true),

    author : varchar('author', { length : 50 }),
    pages : integer('pages'),
    weight : numeric('weight', { precision : 2, scale : 2}),
    
    categoryId : uuid('category_id'),

    createdAt : timestamp('created_at', { mode : "date", withTimezone : true }).defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow(),
},
(table) => [
    index('idx_product_category_id').on(table.categoryId)
]);