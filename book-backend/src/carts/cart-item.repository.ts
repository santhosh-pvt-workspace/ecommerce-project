import { DatabaseService } from '@/database/database.service';
import { cartItemTable, cartTable } from '@/database/schema';
import { Injectable } from '@nestjs/common';
import { eq, and, InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type CartItem = InferSelectModel<typeof cartItemTable>;
export type NewCartItem = InferInsertModel<typeof cartItemTable>;


@Injectable()
export class CartItemsRepository {
  constructor(private readonly drizzle: DatabaseService) {}

  async findByCartId(cartId: string) {
    return this.drizzle.db
      .select()
      .from(cartItemTable)
      .where(eq(cartItemTable.cartId, cartId));
  }

  async findByCartIdAndProductId(cartId: string, productId: string) {
    const [item] = await this.drizzle.db
      .select()
      .from(cartItemTable)
      .where(
        and(
          eq(cartItemTable.cartId, cartId),
          eq(cartItemTable.productId, productId),
        ),
      )
      .limit(1);

    return item;
  }

  async addItem(data: NewCartItem) {
    const [item] = await this.drizzle.db
      .insert(cartItemTable)
      .values(data)
      .returning();

    return item;
  }

  async updateQuantity(cartItemId: string, quantity: number) {
    const [item] = await this.drizzle.db
      .update(cartItemTable)
      .set({ quantity })
      .where(eq(cartItemTable.id, cartItemId))
      .returning();

    return item;
  }

  async removeItem(cartItemId: string) {
    return this.drizzle.db
      .delete(cartItemTable)
      .where(eq(cartItemTable.id, cartItemId));
  }

  async clearCart(cartId: string) {
    return this.drizzle.db
      .delete(cartItemTable)
      .where(eq(cartItemTable.cartId, cartId));
  }
}
