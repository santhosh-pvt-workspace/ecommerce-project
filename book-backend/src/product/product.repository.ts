import { DatabaseService } from '@/database/database.service';
import { productTable } from '@/database/schema/product.schema';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  ilike,
  InferInsertModel,
  InferSelectModel,
  lte,
  SQL,
} from 'drizzle-orm';
import { QueryProductDto } from './dto/product.request.dto';

// ─── Type Aliases ──────────────────────────────────────────────────────────
export type Product = InferSelectModel<typeof productTable>;
export type NewProduct = InferInsertModel<typeof productTable>;

@Injectable()
export class ProductRepository {
  private readonly logger = new Logger(ProductRepository.name);

  constructor(private readonly drizzle: DatabaseService) {}

  // ─── Internal Error Handler ──────────────────────────────────────────────
  private handleError(method: string, error: unknown): never {
    this.logger.error(`[ProductRepository.${method}]`, error);
    throw new InternalServerErrorException(
      `A database error occurred in ProductRepository.${method}`,
    );
  }

  // ─── Shared Filter Builder ───────────────────────────────────────────────
  private buildFilters(query: QueryProductDto, adminMode = false): SQL[] {
    const filters: SQL[] = [];

    if (!adminMode) {
      filters.push(eq(productTable.isActive, true));
    }

    if (query.search) {
      filters.push(ilike(productTable.productName, `%${query.search}%`));
    }

    if(query.promotionLabel){
      filters.push(eq(productTable.promotionLabel, query.promotionLabel))
    }

    if (query.categoryId) {
      filters.push(eq(productTable.categoryId, query.categoryId));
    }

    if (query.minPrice !== undefined) {
      filters.push(gte(productTable.price, String(query.minPrice)));
    }

    if (query.maxPrice !== undefined) {
      filters.push(lte(productTable.price, String(query.maxPrice)));
    }

    return filters;
  }

  // ─── Order Builder ────────────────────────────────────────────────────────
  private buildOrder(sortBy?: string, order?: string) {
    const direction = order === 'asc' ? asc : desc;

    switch (sortBy) {
      case 'price':
        return direction(productTable.price);
      case 'rating':
        return direction(productTable.rating);
      case 'createdAt':
      default:
        return direction(productTable.createdAt);
    }
  }

  // ─── Queries ──────────────────────────────────────────────────────────────

  async findById(id: string): Promise<Product | undefined> {
    try {
      const [product] = await this.drizzle.db
        .select()
        .from(productTable)
        .where(eq(productTable.id, id))
        .limit(1);

      return product;
    } catch (error) {
      this.handleError('findById', error);
    }
  }

  async findAll(query: QueryProductDto) {
    const { page = 1, limit = 10, sortBy, order } = query;
    const filters = this.buildFilters(query, false);
    const whereClause = filters.length ? and(...filters) : undefined;
    const orderClause = this.buildOrder(sortBy, order);

    try {
      const [data, totalResult] = await Promise.all([
        this.drizzle.db
          .select()
          .from(productTable)
          .where(whereClause)
          .orderBy(orderClause)
          .limit(limit)
          .offset((page - 1) * limit),

        this.drizzle.db
          .select({ total: count() })
          .from(productTable)
          .where(whereClause),
      ]);

      return {
        data,
        total: Number(totalResult[0].total),
        page,
        limit,
      };
    } catch (error) {
      this.handleError('findAll', error);
    }
  }

  async findAllAdmin(query: QueryProductDto) {
    const { page = 1, limit = 10, sortBy, order } = query;
    const filters = this.buildFilters(query, true); // adminMode: includes inactive
    const whereClause = filters.length ? and(...filters) : undefined;
    const orderClause = this.buildOrder(sortBy, order);

    try {
      const [data, totalResult] = await Promise.all([
        this.drizzle.db
          .select()
          .from(productTable)
          .where(whereClause)
          .orderBy(orderClause)
          .limit(limit)
          .offset((page - 1) * limit),

        this.drizzle.db
          .select({ total: count() })
          .from(productTable)
          .where(whereClause),
      ]);

      return {
        data,
        total: Number(totalResult[0].total),
        page,
        limit,
      };
    } catch (error) {
      this.handleError('findAllAdmin', error);
    }
  }

  // ─── Mutations ───────────────────────────────────────────────────────────

  async create(data: NewProduct): Promise<Product> {
    try {
      const [product] = await this.drizzle.db
        .insert(productTable)
        .values(data)
        .returning();

      return product;
    } catch (error) {
      this.handleError('create', error);
    }
  }

  async update(id: string, data: Partial<NewProduct>): Promise<Product | undefined> {
    try {
      const [updated] = await this.drizzle.db
        .update(productTable)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(productTable.id, id))
        .returning();

      return updated;
    } catch (error) {
      this.handleError('update', error);
    }
  }

  async softDelete(id: string): Promise<Product | undefined> {
    try {
      const [updated] = await this.drizzle.db
        .update(productTable)
        .set({ isActive: false, updatedAt: new Date() })
        .where(eq(productTable.id, id))
        .returning();

      return updated;
    } catch (error) {
      this.handleError('softDelete', error);
    }
  }

  async updateStock(id: string, stock: number): Promise<Product | undefined> {
    try {
      const [updated] = await this.drizzle.db
        .update(productTable)
        .set({ stock, updatedAt: new Date() })
        .where(eq(productTable.id, id))
        .returning();

      return updated;
    } catch (error) {
      this.handleError('updateStock', error);
    }
  }

  async updateStatus(id: string, isActive: boolean): Promise<Product | undefined> {
    try {
      const [updated] = await this.drizzle.db
        .update(productTable)
        .set({ isActive, updatedAt: new Date() })
        .where(eq(productTable.id, id))
        .returning();

      return updated;
    } catch (error) {
      this.handleError('updateStatus', error);
    }
  }
}
