import { DatabaseService } from '@/database/database.service';
import { cartTable } from '@/database/schema';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { eq, and, InferInsertModel, InferSelectModel } from 'drizzle-orm';

export type Cart = InferSelectModel<typeof cartTable>;
export type NewCart = InferInsertModel<typeof cartTable>;

@Injectable()
export class CartRepository {
  private readonly logger = new Logger(CartRepository.name);

  constructor(private readonly drizzle: DatabaseService) { }

  // ─── Internal Error Handler ────────────────────────────────────────────────
  private handleError(method: string, error: unknown): never {
    this.logger.error(`[CartRepository.${method}]`, error);
    throw new InternalServerErrorException(
      `A database error occurred in CartRepository.${method}`,
    );
  }

  // ─── Queries ───────────────────────────────────────────────────────────────

  async findbyUserId(userId: string) {
    try {
      const [cart] = await this.drizzle.db
        .select()
        .from(cartTable)
        .where(and(eq(cartTable.userId, userId), eq(cartTable.status, 'active')))
        .limit(1);

      return cart;
    } catch (error) {
      this.handleError('findbyUserId', error);
    }
  }

  async findBySessionId(sessionId: string) {
    try {
      const [cart] = await this.drizzle.db
        .select()
        .from(cartTable)
        .where(
          and(eq(cartTable.sessionId, sessionId), eq(cartTable.status, 'active')),
        )
        .limit(1);

      return cart;
    } catch (error) {
      this.handleError('findBySessionId', error);
    }
  }

  async findOrCreateOne({ userId, sessionId }: { userId?: string; sessionId?: string }) {
    if (!userId && !sessionId) {
      throw new BadRequestException(
        'Either a user session (x-session-id header) or an authenticated user is required to access a cart.',
      );
    }

    let cart: Cart | undefined;

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

  // ─── Mutations ─────────────────────────────────────────────────────────────

  // it can be used for both guest and user
  async addCart(data: { userId?: string; sessionId?: string }) {
    try {
      const cleanData = {
        userId: data.userId ?? null,
        sessionId: data.sessionId ?? null,
      };

      const [cart] = await this.drizzle.db
        .insert(cartTable)
        .values(cleanData)
        .returning();

      return cart;
    } catch (error) {
      this.handleError('addCart', error);
    }
  }

  async updateCart(cartId: string, data: Partial<Cart>) {
    try {
      const [cart] = await this.drizzle.db
        .update(cartTable)
        .set(data)
        .where(eq(cartTable.id, cartId))
        .returning();

      return cart;
    } catch (error) {
      this.handleError('updateCart', error);
    }
  }

  async softDeleteCart(cartId: string) {
    try {
      await this.drizzle.db
        .update(cartTable)
        .set({ status: 'abandoned', deletedAt: new Date() })
        .where(eq(cartTable.id, cartId))
        .returning();

      return { message: "cart deleted successfully" }
    } catch (error) {
      this.handleError('softDeleteCart', error);
    }
  }
}
