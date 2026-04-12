CREATE TYPE "public"."promotion_label" AS ENUM('New Arrival', 'Best Seller', 'Clearance', 'Hot Deal', 'Limited Edition');--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "title" TO "product_name";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "author" TO "sold_by";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "promotion_label" "promotion_label";--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "brand" varchar(255);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "ingredients" text;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "rating" numeric(2, 1) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "tags" text[];--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "special_for" text;--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "pages";--> statement-breakpoint
ALTER TABLE "products" DROP COLUMN "weight";