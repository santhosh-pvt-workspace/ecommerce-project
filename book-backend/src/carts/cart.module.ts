import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { CartItemsRepository } from './cart-item.repository';

@Module({
  imports: [],
  controllers: [CartController],
  providers: [CartService, CartRepository, CartItemsRepository],
  exports: [CartService],
})
export class CartModule {}
