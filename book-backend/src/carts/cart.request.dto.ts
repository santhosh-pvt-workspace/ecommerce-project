import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({
    example: 'book-123',
    description: 'The ID of the product to add to the cart',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    example: 2,
    description: 'The quantity of the product to add',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}

export class UpdateCartItemDto {
  @ApiProperty({
    example: 5,
    description: 'The new quantity for the cart item',
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
