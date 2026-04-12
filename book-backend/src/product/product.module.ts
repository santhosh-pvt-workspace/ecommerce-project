import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { UserModule } from '@/user/user.module';
import { RolesGuard } from '@/utils/roles.guard';
import { UploadService } from '@/storage/file.service';

@Module({
  imports: [
    // Provides JwtModule, PassportModule, and JwtStrategy for guards
    UserModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, RolesGuard, UploadService],
  exports: [ProductService],
})
export class ProductModule {}
