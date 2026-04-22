import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartRepository } from './cart.repository';
import { CartItemsRepository } from './cart-item.repository';
import { UserModule } from '@/user/user.module';
import { ProductRepository } from '@/product/product.repository';

@Module({
  imports: [UserModule],
  controllers: [CartController],
  providers: [CartService, CartRepository, CartItemsRepository, ProductRepository],
  exports: [CartService],
})
export class CartModule {}
