import { ApiProperty } from '@nestjs/swagger';
import { userTable } from '@/database/schema/user.schema';

type User = typeof userTable.$inferSelect;

export class UserResponseDto {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'The unique identifier of the user',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
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
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'The JWT access token',
  })
  accessToken: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user is verified',
  })
  isVerified: boolean;

  static from(data: { token: string; isVerified: boolean }): AuthResponseDto {
    return {
      accessToken: data.token,
      isVerified: data.isVerified,
    };
  }
}
