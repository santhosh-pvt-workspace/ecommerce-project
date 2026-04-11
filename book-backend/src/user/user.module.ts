import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppJwtService } from '@/utils/jwt.utils';
import { UserRepository } from './user.repository';
import { JwtStrategy } from '@/utils/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('SECRET_KEY'),
        signOptions: {
          expiresIn: configService.getOrThrow('EXPIRES_IN'),
        },
      }),
    }),
    PassportModule
  ],
  controllers: [UserController],
  providers: [UserRepository, AppJwtService, UserService, JwtStrategy],
  exports: [JwtModule, PassportModule]
})
export class UserModule { }
