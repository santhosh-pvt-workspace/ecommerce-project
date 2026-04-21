import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { UploadService } from '@/storage/file.service';
import {
  CreateProductDto,
  QueryProductDto,
  UpdateProductDto,
  UpdateStockDto,
  UpdateStatusDto,
} from './dto/product.request.dto';
import {
  PaginatedProductResponseDto,
  ProductResponseDto,
} from './dto/product.response.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepo: ProductRepository,
    private readonly uploadService: UploadService,
  ) {}

  // ─── Validation Helpers ────────────────────────────────────────────────

  private validateProductInputs(dto: { price?: number; stock?: number; offerPercentage?: number }) {
    if (dto.price !== undefined && dto.price <= 0) {
      throw new BadRequestException('Price must be greater than 0');
    }
    if (dto.stock !== undefined && dto.stock < 0) {
      throw new BadRequestException('Stock cannot be negative');
    }
    if (
      dto.offerPercentage !== undefined &&
      (dto.offerPercentage < 0 || dto.offerPercentage > 100)
    ) {
      throw new BadRequestException('Offer percentage must be between 0 and 100');
    }
  }

  // ─── Create ───────────────────────────────────────────────────────────────

  async createProduct(
    dto: CreateProductDto,
    file?: Express.Multer.File,
  ): Promise<ProductResponseDto> {
    this.validateProductInputs(dto);

    // 📷 Upload image to Cloudinary if a file was provided
    let imageUrl: string | undefined;
    let imagePublicId: string | undefined;

    if (file) {
      const uploaded = await this.uploadService.uploadImage(file, 'product');
      imageUrl = uploaded.url;
      imagePublicId = uploaded.publicId;
    }

    const product = await this.productRepo.create({
      productName: dto.productName,
      description: dto.description,
      price: String(dto.price),
      rating : String(dto.rating),
      stock: dto.stock,
      categoryId: dto.categoryId,
      imageUrl,
      imagePublicId,
      brand: dto.brand,
      promotionLabel: dto.promotionLabel as any,
      soldBy: dto.soldBy,
      ingredients: dto.ingredients,
      specialFor: dto.specialFor,
      tags: dto.tags,
      offerPercentage: dto.offerPercentage ?? 0,
    });

    return ProductResponseDto.from(product);
  }

  // ─── Get All (Public) ──────────────────────────────────────────────────

  async getAllProducts(query: QueryProductDto): Promise<PaginatedProductResponseDto> {
    const result = await this.productRepo.findAll(query);

    return {
      data: result.data.map(ProductResponseDto.from),
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
      },
    };
  }

  // ─── Get All (Admin — includes inactive) ──────────────────────────────

  async getAdminProducts(query: QueryProductDto): Promise<PaginatedProductResponseDto> {
    const result = await this.productRepo.findAllAdmin(query);

    return {
      data: result.data.map(ProductResponseDto.from),
      meta: {
        total: result.total,
        page: result.page,
        limit: result.limit,
      },
    };
  }

  // ─── Get By ID ─────────────────────────────────────────────────────────

  async getProductById(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepo.findById(id);

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return ProductResponseDto.from(product);
  }

  // ─── Update ────────────────────────────────────────────────────────────

  async updateProduct(id: string, dto: UpdateProductDto): Promise<ProductResponseDto> {
    this.validateProductInputs(dto);

    // Ensure product exists
    await this.getProductById(id);

    const updated = await this.productRepo.update(id, {
      ...(dto.productName && { productName: dto.productName }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.price !== undefined && { price: String(dto.price) }),
      ...(dto.stock !== undefined && { stock: dto.stock }),
      ...(dto.brand !== undefined && { brand: dto.brand }),
      ...(dto.promotionLabel !== undefined && { promotionLabel: dto.promotionLabel as any }),
      ...(dto.soldBy !== undefined && { soldBy: dto.soldBy }),
      ...(dto.ingredients !== undefined && { ingredients: dto.ingredients }),
      ...(dto.specialFor !== undefined && { specialFor: dto.specialFor }),
      ...(dto.tags !== undefined && { tags: dto.tags }),
      ...(dto.offerPercentage !== undefined && { offerPercentage: dto.offerPercentage }),
      ...(dto.imageUrl !== undefined && { imageUrl: dto.imageUrl }),
      ...(dto.imagePublicId !== undefined && { imagePublicId: dto.imagePublicId }),
    });

    return ProductResponseDto.from(updated!);
  }

  // ─── Soft Delete ───────────────────────────────────────────────────────

  async softDeleteProduct(id: string): Promise<{ message: string }> {
    await this.getProductById(id); // ensure exists

    await this.productRepo.softDelete(id);

    return { message: `Product ${id} has been deactivated successfully` };
  }

  // ─── Update Stock ──────────────────────────────────────────────────────

  async updateStock(id: string, dto: UpdateStockDto): Promise<ProductResponseDto> {
    await this.getProductById(id);

    const updated = await this.productRepo.updateStock(id, dto.stock);
    return ProductResponseDto.from(updated!);
  }

  // ─── Update Status ─────────────────────────────────────────────────────

  async updateStatus(id: string, dto: UpdateStatusDto): Promise<ProductResponseDto> {
    await this.getProductById(id);

    const updated = await this.productRepo.updateStatus(id, dto.isActive);
    return ProductResponseDto.from(updated!);
  }
}
