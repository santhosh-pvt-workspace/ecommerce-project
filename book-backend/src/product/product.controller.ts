import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
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
import { ApiDoc } from '@/common/api-doc.decorator';
import { JwtAuthGuard } from '@/utils/jwt.guard';
import { RolesGuard } from '@/utils/roles.guard';
import { Roles } from '@/utils/roles.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ─── Public Routes ─────────────────────────────────────────────────────

  @Get()
  @ApiDoc({
    summary: 'Get all active products',
    description: 'Returns paginated active products with optional filters (search, category, price range, sorting)',
    successType: PaginatedProductResponseDto,
  })
  async getAllProducts(@Query() query: QueryProductDto) {
    return this.productService.getAllProducts(query);
  }

  @Get(':id')
  @ApiDoc({
    summary: 'Get product by ID',
    description: 'Returns a single active product by its UUID',
    successType: ProductResponseDto,
  })
  async getProductById(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.getProductById(id);
  }

  // ─── Admin Routes ──────────────────────────────────────────────────────

  @Get('admin/list')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiDoc({
    summary: '[Admin] Get all products including inactive',
    description: 'Admin endpoint: returns all products regardless of active status',
    successType: PaginatedProductResponseDto,
  })
  async getAdminProducts(@Query() query: QueryProductDto) {
    return this.productService.getAdminProducts(query);
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create product with optional image upload',
    schema: {
      type: 'object',
      required: ['productName', 'description', 'price', 'stock', 'categoryId'],
      properties: {
        image:          { type: 'string', format: 'binary', description: 'Product image file (optional)' },
        productName:   { type: 'string', example: 'Argan Oil Shampoo' },
        description:   { type: 'string', example: 'A nourishing shampoo with pure Argan oil.' },
        price:         { type: 'number', example: 29.99 },
        stock:         { type: 'number', example: 100 },
        categoryId:    { type: 'string', format: 'uuid' },
        brand:         { type: 'string', example: 'Moroccan Gold' },
        promotionLabel: { type: 'string', enum: ['New Arrival', 'Best Seller', 'Clearance', 'Hot Deal', 'Limited Edition'] },
        soldBy:        { type: 'string', example: 'NatureCare Store' },
        ingredients:   { type: 'string', example: 'Water, Argan Oil...' },
        specialFor:    { type: 'string', example: 'Dry and frizzy hair' },
        offerPercentage: { type: 'number', example: 15 },
      },
    },
  })
  async createProduct(
    @Body() dto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.productService.createProduct(dto, file);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiDoc({
    summary: '[Admin] Update a product',
    description: 'Partial update of any product field',
    bodyType: UpdateProductDto,
    successType: ProductResponseDto,
  })
  async updateProduct(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiDoc({
    summary: '[Admin] Soft delete a product',
    description: 'Sets isActive = false. Product is hidden from public listings but not removed from DB.',
  })
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    return this.productService.softDeleteProduct(id);
  }

  @Patch(':id/stock')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiDoc({
    summary: '[Admin] Update product stock',
    description: 'Directly set the stock quantity for a product',
    bodyType: UpdateStockDto,
    successType: ProductResponseDto,
  })
  async updateStock(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStockDto,
  ) {
    return this.productService.updateStock(id, dto);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiDoc({
    summary: '[Admin] Toggle product active/inactive status',
    description: 'Activate or deactivate a product without deleting it',
    bodyType: UpdateStatusDto,
    successType: ProductResponseDto,
  })
  async updateStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStatusDto,
  ) {
    return this.productService.updateStatus(id, dto);
  }
}
