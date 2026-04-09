import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CartModule } from './carts/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
    }),
    DatabaseModule,
    UserModule,
    CartModule
  ],
})
export class AppModule {}
