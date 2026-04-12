import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { productTable } from '@/database/schema/product.schema';

type Product = typeof productTable.$inferSelect;

// ─── Single Product Response ───────────────────────────────────────────────
export class ProductResponseDto {
  @ApiProperty({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  id: string;

  @ApiProperty({ example: 'Argan Oil Shampoo' })
  productName: string;

  @ApiPropertyOptional({ example: 'A nourishing shampoo with pure Argan oil.' })
  description: string | null;

  @ApiPropertyOptional({ example: 'https://res.cloudinary.com/...' })
  imageUrl: string | null;

  @ApiPropertyOptional({ example: 'products/argan-oil-shampoo' })
  imagePublicId: string | null;

  @ApiProperty({ example: '29.99' })
  price: string;

  @ApiProperty({ example: 100 })
  stock: number;

  @ApiPropertyOptional({ example: 15 })
  offerPercentage: number | null;

  @ApiProperty({ example: true })
  isActive: boolean | null;

  @ApiPropertyOptional({ example: 'NatureCare Store' })
  soldBy: string | null;

  @ApiPropertyOptional({ example: 'New Arrival' })
  promotionLabel: string | null;

  @ApiPropertyOptional({ example: 'Moroccan Gold' })
  brand: string | null;

  @ApiPropertyOptional({ example: 'Water, Argan Oil, Keratin...' })
  ingredients: string | null;

  @ApiPropertyOptional({ example: '4.5' })
  rating: string | null;

  @ApiPropertyOptional({ example: ['shampoo', 'hair care'], type: [String] })
  tags: string[] | null;

  @ApiPropertyOptional({ example: 'Dry and frizzy hair' })
  specialFor: string | null;

  @ApiPropertyOptional({ example: 'd290f1ee-6c54-4b01-90e6-d701748f0851' })
  categoryId: string | null;

  @ApiProperty({ example: '2026-04-12T00:00:00.000Z' })
  createdAt: Date;

  @ApiPropertyOptional({ example: '2026-04-12T00:00:00.000Z' })
  updatedAt: Date | null;

  static from(product: Product): ProductResponseDto {
    return {
      id: product.id,
      productName: product.productName,
      description: product.description ?? null,
      imageUrl: product.imageUrl ?? null,
      imagePublicId: product.imagePublicId ?? null,
      price: product.price,
      stock: product.stock,
      offerPercentage: product.offerPercentage ?? null,
      isActive: product.isActive ?? null,
      soldBy: product.soldBy ?? null,
      promotionLabel: product.promotionLabel ?? null,
      brand: product.brand ?? null,
      ingredients: product.ingredients ?? null,
      rating: product.rating ?? null,
      tags: product.tags ?? null,
      specialFor: product.specialFor ?? null,
      categoryId: product.categoryId ?? null,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt ?? null,
    };
  }
}

// ─── Pagination Meta ──────────────────────────────────────────────────────
export class PaginationMetaDto {
  @ApiProperty({ example: 100 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 10 })
  limit: number;
}

// ─── Paginated Product List Response ─────────────────────────────────────
export class PaginatedProductResponseDto {
  @ApiProperty({ type: [ProductResponseDto] })
  data: ProductResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
