import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../db/schema";
import { config } from "./environment.config";
export const pool = new Pool({
  connectionString: config.dbUrl,
  ssl: false,
});

export const db = drizzle(pool, { schema });
