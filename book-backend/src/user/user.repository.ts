import { DatabaseService } from '@/database/database.service';
import { userTable } from '@/database/schema';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  and,
  count,
  eq,
  ilike,
  InferInsertModel,
  InferSelectModel,
  isNotNull,
  isNull,
} from 'drizzle-orm';

// ✅ InferSelectModel for fetched rows (all fields exist), InferInsertModel for inserts
export type User = InferSelectModel<typeof userTable>;
export type NewUser = InferInsertModel<typeof userTable>;

export type FindUserQuery = {
  page?: number;
  pageSize?: number;
  email?: string;
  isActive: boolean;
};

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly drizzle: DatabaseService) {}

  // ─── Internal Error Handler ────────────────────────────────────────────────
  private handleError(method: string, error: unknown): never {
    this.logger.error(`[UserRepository.${method}]`, error);
    throw new InternalServerErrorException(
      `A database error occurred in UserRepository.${method}`,
    );
  }

  // ─── Queries ───────────────────────────────────────────────────────────────

  async findById(id: string): Promise<User[]> {
    try {
      return await this.drizzle.db
        .select()
        .from(userTable)
        .where(eq(userTable.id, id))
        .limit(1);
    } catch (error) {
      this.handleError('findById', error);
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    try {
      const [user] = await this.drizzle.db
        .select()
        .from(userTable)
        .where(and(eq(userTable.email, email), eq(userTable.isActive, true)));

      return user;
    } catch (error) {
      this.handleError('findByEmail', error);
    }
  }

  async findAll(query: FindUserQuery) {
    const { page = 1, pageSize = 10, email, isActive } = query;

    try {
      const filters: any[] = [isNull(userTable.deletedAt)];

      if (email) {
        filters.push(ilike(userTable.email, `%${email}%`));
      }

      if (isActive !== undefined) {
        filters.push(eq(userTable.isActive, isActive));
      }

      const whereClause = filters.length ? and(...filters) : undefined;

      const [data, totalResult] = await Promise.all([
        this.drizzle.db
          .select()
          .from(userTable)
          .where(whereClause)
          .limit(pageSize)
          .offset((page - 1) * pageSize),

        this.drizzle.db
          .select({ total: count() })
          .from(userTable)
          .where(whereClause),
      ]);

      return {
        data,
        total: Number(totalResult[0].total),
        page,
        pageSize,
      };
    } catch (error) {
      this.handleError('findAll', error);
    }
  }

  // ─── Mutations ─────────────────────────────────────────────────────────────

  async createUser(userData: NewUser): Promise<User[]> {
    try {
      return await this.drizzle.db
        .insert(userTable)
        .values(userData)
        .returning();
    } catch (error) {
      this.handleError('createUser', error);
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<User[]> {
    try {
      return await this.drizzle.db
        .update(userTable)
        .set(data)
        .where(eq(userTable.id, id))
        .returning();
    } catch (error) {
      this.handleError('updateUser', error);
    }
  }

  async deleteUser(id: string): Promise<User[]> {
    try {
      return await this.drizzle.db
        .update(userTable)
        .set({ deletedAt: new Date() })
        .where(eq(userTable.id, id))
        .returning();
    } catch (error) {
      this.handleError('deleteUser', error);
    }
  }

  async restoreUser(id: string) {
    try {
      return await this.drizzle.db
        .update(userTable)
        .set({ deletedAt: null })
        .where(and(eq(userTable.id, id), isNotNull(userTable.deletedAt)));
    } catch (error) {
      this.handleError('restoreUser', error);
    }
  }
}
