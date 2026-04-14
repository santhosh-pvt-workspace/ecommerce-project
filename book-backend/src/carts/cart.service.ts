import { BadRequestException, Injectable } from '@nestjs/common';
import { CartItemsRepository } from './cart-item.repository';
import { CartRepository } from './cart.repository';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';


@Injectable()
export class CartService {
  constructor(
    private readonly cartRepo: CartRepository,
    private readonly cartItemsRepo: CartItemsRepository,
  ) { }

  async getCart(data: { userId?: string; sessionId?: string }, res?: Response) {
    let { userId, sessionId } = data;

    // 1. If user is logged in, use userId
    if (userId) {
      return this.cartRepo.findOrCreateOne({ userId });
    }

    // 2. If guest has a session cookie, use it
    if (sessionId) {
      return this.cartRepo.findOrCreateOne({ sessionId });
    }

    // 3. New guest: Generate sessionId and set cookie
    const newSessionId = uuidv4();
    if (res) {
      res.cookie('session_id', newSessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      });
    }

    return this.cartRepo.findOrCreateOne({ sessionId: newSessionId });
  }

  async addCartItems({
    userId,
    sessionId,
    productId,
    quantity,
    price,
    res,
  }: {
    userId?: string;
    sessionId?: string;
    productId: string;
    quantity: number;
    price: string;
    res?: Response;
  }) {
    // get cart (this will set cookie if it's a new guest session)
    const cart = await this.getCart({ userId, sessionId }, res);

    // check existing item
    const existingItem = await this.cartItemsRepo.findByCartIdAndProductId(
      cart.id,
      productId,
    );

    // if exist update quantity
    if (existingItem) {
      return this.cartItemsRepo.updateQuantity(
        existingItem.id,
        existingItem.quantity + quantity,
      );
    }

    return this.cartItemsRepo.addItem({
      cartId: cart.id,
      productId: productId,
      quantity: quantity,
      priceSnapshot: price,
    });
  }

  async updateCartItemsQuantity(cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    return this.cartItemsRepo.updateQuantity(cartItemId, quantity);
  }

  async removeFromCart(cartItemId: string) {
    return this.cartItemsRepo.removeItem(cartItemId);
  }

  async clearCart(cartId: string) {
    return this.cartItemsRepo.clearCart(cartId);
  }

  async mergeCarts(sessionId: string, userId: string) {
    const guestCart = await this.cartRepo.findBySessionId(sessionId);
    if (!guestCart) return;

    const userCart = await this.cartRepo.findbyUserId(userId);

    // Case 1: user has no cart → assign guest cart
    if (!userCart) {
      return await this.cartRepo.updateCart(guestCart.id, {
        userId: userId,
        sessionId: null,
      });
    }

    const guestItems = await this.cartItemsRepo.findByCartId(guestCart.id);
    const userItems = await this.cartItemsRepo.findByCartId(userCart.id);

    for (const guestItem of guestItems) {
      const existing = userItems.find(
        (item) => item.productId === guestItem.productId,
      );

      if (existing) {
        // ✅ No `return` here — must continue processing remaining items
        await this.cartItemsRepo.updateQuantity(
          existing.id,
          existing.quantity + guestItem.quantity,
        );
      } else {
        await this.cartItemsRepo.updateItemCart(guestItem.id, userCart.id);
      }
    }

    // Clear any remaining guest items before soft-deleting the cart
    await this.cartItemsRepo.clearCart(guestCart.id);
    await this.cartRepo.softDeleteCart(guestCart.id);

    return userCart;
  }

  async markCartAsOrdered(cartId: string) {
    return this.cartRepo.updateCart(cartId, { status: 'ordered' });
  }

  async abandonCart(cartId: string) {
    return this.cartRepo.updateCart(cartId, { status: 'abandoned' });
  }
}
