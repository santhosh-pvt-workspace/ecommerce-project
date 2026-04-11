import { DatabaseService } from '@/database/database.service';
import { cartTable } from '@/database/schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { eq, and, InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type Cart = InferSelectModel<typeof cartTable>;
export type NewCart = InferInsertModel<typeof cartTable>;

@Injectable()
export class CartRepository {
  constructor(private readonly drizzle: DatabaseService) {}

  // it can be used for both guest and user
  async addCart(data: { userId?: string; sessionId?: string }) {
    const cleanData = {
      userId: data.userId ?? null,
      sessionId: data.sessionId ?? null,
    };

    const [cart] = await this.drizzle.db
      .insert(cartTable)
      .values(cleanData)
      .returning();

    return cart;
  }

  async findbyUserId(userId: string) {
    const [cart] = await this.drizzle.db
      .select()
      .from(cartTable)
      .where(and(eq(cartTable.userId, userId), eq(cartTable.status, 'active')))
      .limit(1);

    return cart;
  }

  async findBySessionId(sessionId: string) {
    const [cart] = await this.drizzle.db
      .select()
      .from(cartTable)
      .where(
        and(eq(cartTable.sessionId, sessionId), eq(cartTable.status, 'active')),
      )
      .limit(1);

    return cart;
  }

  async updateCart(cartId: string, data: Partial<Cart>) {
    const [cart] = await this.drizzle.db
      .update(cartTable)
      .set(data)
      .where(eq(cartTable.id, cartId))
      .returning();

    return cart;
  }

  async softDeleteCart(cartId: string) {
    return this.drizzle.db
      .update(cartTable)
      .set({ status: 'abandoned', deletedAt: new Date() })
      .where(eq(cartTable.id, cartId));
  }

  async findOrCreateOne({ userId, sessionId }: { userId?: string; sessionId?: string }) {
    if (!userId && !sessionId) {
      throw new BadRequestException(
        'Either a user session (x-session-id header) or an authenticated user is required to access a cart.',
      );
    }

    let cart: Cart;

    if (userId) {
      cart = await this.findbyUserId(userId);
      if (cart) return cart;
    }

    if (sessionId) {
      cart = await this.findBySessionId(sessionId);
      if (cart) return cart;
    }

    return this.addCart({ userId, sessionId });
  }
}
