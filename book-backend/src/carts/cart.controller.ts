import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CartService } from './cart.service';
import { CartResponseDto, CartItemResponseDto } from './cart.response.dto';
import { AddToCartDto, UpdateCartItemDto } from './cart.request.dto';
import { ApiDoc } from '@/common/api-doc.decorator';
import { JwtAuthGuard } from '@/utils/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  // to create or get existing cart
  @Get()
  @ApiDoc({
    summary: 'Get current cart session',
    description: 'Retrieves the current cart for the user or guest session',
    successType: CartResponseDto,
  })
  async getCart(@Req() req: any, @Res({ passthrough: true }) res: any) {
    const userId = req.user?.id;
    const sessionId = req.cookies?.['session_id'];

    return this.cartService.getCart({ userId, sessionId }, res);
  }

  @Post('add')
  // @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiDoc({
    summary: 'Add item to cart',
    description: 'Adds a product to the cart or updates quantity if it already exists',
    bodyType: AddToCartDto,
    successType: CartItemResponseDto,
  })
  async addCart(@Body() dto: AddToCartDto, @Req() req: any, @Res({ passthrough: true }) res: any) {

    const userId = req.user?.id;
    const sessionId = req.cookies?.['session_id'];

    return this.cartService.addCartItems({
      userId: userId,
      sessionId: sessionId,
      productId: dto.productId,
      quantity: dto.quantity,
      // TODO: fetch actual product price from product service instead of hardcoding
      price: '100',
      res
    });
  }



  // to update quantity
  @Patch('item/:id')
  @ApiDoc({
    summary: 'Update cart item quantity',
    bodyType: UpdateCartItemDto,
    successType: CartItemResponseDto,
  })
  async updateCartItem(
    @Param('id') cartItemId: string,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItemsQuantity(cartItemId, dto.quantity);
  }

  // delete specific item in cart
  @Delete('item/:id')
  @ApiDoc({
    summary: 'Remove item from cart',
    description: 'Removes a specific cart item by its ID',
  })
  async removeItem(@Param('id') cartItemId: string) {
    return this.cartService.removeFromCart(cartItemId);
  }

  // clear overall cart
  @Delete(':id')
  @ApiDoc({
    summary: 'Clear entire cart',
    description: 'Removes all items and resets the cart',
  })
  async clearCart(@Param('id') cartId: string) {
    return this.cartService.clearCart(cartId);
  }

  @Patch(':id/order')
  @ApiDoc({
    summary: 'Mark cart as ordered',
  })
  async markAsOrdered(@Param('id') cartId: string) {
    return this.cartService.markCartAsOrdered(cartId);
  }

  @Patch(':id/abandon')
  @ApiDoc({
    summary: 'Mark cart as abandoned',
  })
  async abandonCart(@Param('id') cartId: string) {
    return this.cartService.abandonCart(cartId);
  }
}
