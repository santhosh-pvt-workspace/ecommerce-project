import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length, MinLength } from "class-validator";

export class RegisterRequestDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '1234567890',
    description: 'The mobile number of the user',
  })
  @IsString()
  @Length(10, 12)
  mobileNumber: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsEmail({}, { message: 'Invalid Email format' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password for the user account',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}

export class LoginRequestDto {
  @ApiProperty({
    example: 'santhosk.dev@gmail.com',
    description: 'The email address of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'The password for the user account',
  })
  @MinLength(6)
  password: string;
}

