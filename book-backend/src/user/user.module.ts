import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppJwtService } from '@/utils/jwt.utils';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  controllers : [UserController],
  providers : [UserRepository, AppJwtService, UserService],
  exports : [JwtModule]
})
export class UserModule {}
