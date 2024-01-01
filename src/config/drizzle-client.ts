import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../db/schema";
export const pool = new Pool({
  connectionString: process.env.PG_DATABASE as string,
  ssl: false,
});

export const db = drizzle(pool, { schema });
