import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseService, DRIZZLE, PG_POOL } from "./database.service";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

@Global()
@Module({
    imports : [ConfigModule],
    providers : [
        {
            provide : PG_POOL,
            inject : [ConfigService],
            useFactory : async (config : ConfigService) => {
                return new Pool({
                    connectionString : config.get<string>('DATABASE_URL')
                });
            },
        },

        {
            provide : DRIZZLE,
            inject  : [PG_POOL],
            useFactory : async (ConfigService : ConfigService) => {
                const pool = new Pool({
                    max : 10,
                    connectionTimeoutMillis : 5000,
                    idleTimeoutMillis : 3000,
                    connectionString : process.env.DATABASE_URL!,
                    allowExitOnIdle : true
                })

                return drizzle(pool);
            }

        },
        DatabaseService
    ],
    exports : [DatabaseService]
})

export class DatabaseModule{}