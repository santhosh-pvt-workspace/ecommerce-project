import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";


export const DRIZZLE = Symbol('DRIZZLE');

export const PG_POOL = Symbol('PG_POOL');


@Injectable()
export class DatabaseService implements OnModuleDestroy{
    constructor(
        @Inject(DRIZZLE)
        public readonly db: NodePgDatabase,

        @Inject(PG_POOL)
        public readonly pool : Pool
    ) {}

    async onModuleDestroy() {
        await this.pool.end();
    }
}