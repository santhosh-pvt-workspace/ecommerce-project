import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Max,
  IsBoolean,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

// ─── Promotion Label Enum ──────────────────────────────────────────────────
// Keep in sync with the pgEnum in product.schema.ts
export enum PromotionLabel {
  NEW_ARRIVAL = 'New Arrival',
  BEST_SELLER = 'Best Seller',
  CLEARANCE = 'Clearance',
  HOT_DEAL = 'Hot Deal',
  LIMITED_EDITION = 'Limited Edition',
}

// ─── Create ───────────────────────────────────────────────────────────────
// Note: imageUrl and imagePublicId are NOT accepted from the client.
// They are set server-side after uploading the image file to Cloudinary.
export class CreateProductDto {
  @ApiProperty({ example: 'Argan Oil Shampoo', minLength: 3 })
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  productName: string;

  @ApiProperty({ example: 'A nourishing shampoo with pure Argan oil.' })
  @IsString()
  description: string;

  // form-data sends numbers as strings → @Type() coerces before validation
  @ApiProperty({ example: 29.99 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @ApiProperty({ example: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  stock: number;

  @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  @IsUUID()
  categoryId: string;

  @ApiPropertyOptional({ example: 'Moroccan Gold' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  brand?: string;

  @ApiPropertyOptional({ enum: PromotionLabel, example: PromotionLabel.NEW_ARRIVAL })
  @IsOptional()
  @IsEnum(PromotionLabel)
  promotionLabel?: PromotionLabel;

  @ApiPropertyOptional({ example: 'NatureCare Store' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  soldBy?: string;

  @ApiPropertyOptional({ example: 'Water, Argan Oil, Keratin...' })
  @IsOptional()
  @IsString()
  ingredients?: string;

  @ApiPropertyOptional({ example: 'Dry and frizzy hair' })
  @IsOptional()
  @IsString()
  specialFor?: string;

  @ApiPropertyOptional({ example: ['shampoo', 'hair care', 'natural'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: 15, minimum: 0, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @Max(100)
  offerPercentage?: number;
}

// ─── Update ───────────────────────────────────────────────────────────────
export class UpdateProductDto {
  @ApiPropertyOptional({ example: 'Argan Oil Shampoo', minLength: 3 })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  productName?: string;

  @ApiPropertyOptional({ example: 'A nourishing shampoo with pure Argan oil.' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 29.99 })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @ApiPropertyOptional({ example: 100 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stock?: number;

  @ApiPropertyOptional({ example: 'Moroccan Gold' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  brand?: string;

  @ApiPropertyOptional({ enum: PromotionLabel, example: PromotionLabel.BEST_SELLER })
  @IsOptional()
  @IsEnum(PromotionLabel)
  promotionLabel?: PromotionLabel;

  @ApiPropertyOptional({ example: 'NatureCare Store' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  soldBy?: string;

  @ApiPropertyOptional({ example: 'Water, Argan Oil, Keratin...' })
  @IsOptional()
  @IsString()
  ingredients?: string;

  @ApiPropertyOptional({ example: 'Dry and frizzy hair' })
  @IsOptional()
  @IsString()
  specialFor?: string;

  @ApiPropertyOptional({ example: ['shampoo', 'hair care'], type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ example: 10, minimum: 0, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  offerPercentage?: number;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...' })
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional({ example: 'products/argan-oil-shampoo' })
  @IsOptional()
  @IsString()
  imagePublicId?: string;
}

// ─── Query ────────────────────────────────────────────────────────────────
export class QueryProductDto {
  @ApiPropertyOptional({ example: 'shampoo', description: 'Search by product name (ILIKE)' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851', description: 'Filter by category UUID' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({ example: 10, description: 'Minimum price filter' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ example: 500, description: 'Maximum price filter' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ enum: ['price', 'rating', 'createdAt'], example: 'createdAt' })
  @IsOptional()
  @IsString()
  sortBy?: 'price' | 'rating' | 'createdAt';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], example: 'desc' })
  @IsOptional()
  @IsString()
  order?: 'asc' | 'desc';

  @ApiPropertyOptional({ example: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}

// ─── Stock Update ─────────────────────────────────────────────────────────
export class UpdateStockDto {
  @ApiProperty({ example: 50, description: 'New stock quantity', minimum: 0 })
  @IsInt()
  @Min(0)
  stock: number;
}

// ─── Status Update ────────────────────────────────────────────────────────
export class UpdateStatusDto {
  @IsBoolean()
  @ApiProperty({ example: true, description: 'Set product active status' })
  isActive: boolean;
}
