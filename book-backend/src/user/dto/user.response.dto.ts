import { userTable } from '@/database/schema/user.schema';
import { CreateUserInput } from '../user.repository';

type User = typeof userTable.$inferSelect;

export class UserResponseDto {
  id: string;
  name: string;
  email: string;

  static from(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export class AuthResponseDto {
  accessToken: string;
  isVerified: boolean;

  static from(data: { token: string; isVerified: boolean }): AuthResponseDto {
    return {
      accessToken: data.token,
      isVerified: data.isVerified,
    };
  }
}
