import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartItemDto } from './cart.request.dto';
import { ApiDoc } from '@/common/api-doc.decorator';
import { JwtAuthGuard } from '@/utils/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  // to create or get existing cart
  @Get('list')
  @ApiDoc({
    summary: 'Get current cart session',
    description: 'Retrieves the current cart for the user or guest session',
  })
  async getCart(@Req() req: any) {
    const userId = req.user?.id;
    const sessionId = req.headers['x-session-id'];

    return this.cartService.getCart({ userId, sessionId });
  }

  // add items in the cart
  @Post('add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiDoc({
    summary: 'Add item to cart',
    description: 'Adds a product to the cart or updates quantity if it already exists',
    bodyType: AddToCartDto,
  })
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
      // TODO: fetch actual product price from product service instead of hardcoding
      price: '100',
    });
  }



  // to update quantity
  @Patch('item/:id')
  @ApiDoc({
    summary: 'Update cart item quantity',
    bodyType: UpdateCartItemDto,
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
