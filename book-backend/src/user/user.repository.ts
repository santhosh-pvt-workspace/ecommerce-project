import { DatabaseService } from '@/database/database.service';
import { userTable } from '@/database/schema';
import { Injectable } from '@nestjs/common';
import {
  and,
  count,
  eq,
  ilike,
  InferInsertModel,
  isNotNull,
  isNull,
} from 'drizzle-orm';

export type User = InferInsertModel<typeof userTable>;

export type FindUserQuery = {
  page?: number;
  pageSize?: number;
  email?: string;
  isActive: boolean;
};

@Injectable()
export class UserRepository {
  constructor(private readonly drizzle: DatabaseService) {}

  async findById(id: string) {
    return this.drizzle.db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id))
      .limit(1);
  }

  async createUser(userData: User) {
    return this.drizzle.db.insert(userTable).values(userData).returning();
  }

  async findByEmail(email: string) {
    const [user] = await this.drizzle.db
      .select()
      .from(userTable)
      .where(and(eq(userTable.email, email), eq(userTable.isActive,  true)))

    return user
  }

  async deleteUser(id: string) {
    return this.drizzle.db
      .update(userTable)
      .set({ deletedAt: new Date() })
      .where(eq(userTable.id, id))
      .returning();
  }

  async updateUser(id: string, data: Partial<User>) {
    return this.drizzle.db
      .update(userTable)
      .set(data)
      .where(eq(userTable.id, id))
      .returning();
  }

  async restoreUser(id: string) {
    return this.drizzle.db
      .update(userTable)
      .set({ deletedAt: null })
      .where(and(eq(userTable.id, id), isNotNull(userTable.deletedAt)));
  }

  async findAll(query: FindUserQuery) {
    const { page = 1, pageSize = 10, email, isActive } = query;

    const filters: any = [];

    filters.push(isNull(userTable.deletedAt));

    if (email) {
      filters.push(ilike(userTable.email, `%${email}%`));
    }

    if (isActive !== undefined) {
      filters.push(eq(userTable.isActive, isActive));
    }

    const whereClause = filters.length ? and(...filters) : undefined;

    const data = await this.drizzle.db
      .select()
      .from(userTable)
      .where(whereClause)
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const totalResult = await this.drizzle.db
      .select({ total: count() })
      .from(userTable)
      .where(whereClause);

    const total = Number(totalResult[0].total);

    return {
      data,
      total,
      page,
      pageSize,
    };
  }
}
