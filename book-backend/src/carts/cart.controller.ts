import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './cart.request.dto';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // to create or get existing cart
  @Get('list')
  async getCart(@Req() req: any) {
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'];

    return this.cartService.getCart({ userId, sessionId });
  }

  // add items in the cart
  @Post('add')
  async addCart(@Body() dto: AddToCartDto, @Req() req: any) {
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'];

    console.log("ADD CART:", {
    userId,
    sessionId,
    dto
  });


    return this.cartService.addCartItems({
      userId: userId,
      sessionId: sessionId,
      productId: dto.productId,
      quantity: dto.quantity,
      price: '100',
    });
  }

  

  // to update quantity
  @Patch()
  async updateCartItem(
    @Param('id') cartItemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItemsQuantity(cartItemId, dto.quantity);
  }

  // delete specific item in cart
  @Delete('item/:id')
  async removeItem(@Param('id') cartItemId: string) {
    return this.cartService.removeFromCart(cartItemId);
  }

  // clear overall cart
  @Delete(':id')
  async clearCart(cartId: string) {
    return this.cartService.clearCart(cartId);
  }

  @Patch('item/:id/order')
  async markAsOrdered(@Param('id') cartId: string) {
    return this.cartService.markCartAsOrdered(cartId);
  }

  @Patch('item/:id/abandon')
  async abandonCart(@Param('id') cartId: string) {
    return this.cartService.abandonCart(cartId);
  }
}
