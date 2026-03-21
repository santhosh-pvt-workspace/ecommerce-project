import * as dotenv from 'dotenv';
import { defineConfig } from "drizzle-kit";

dotenv.config();

console.log("DB URL:", process.env.DATABASE_URL); // 👈 DEBUG

export default defineConfig({
  schema: "./src/database/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});