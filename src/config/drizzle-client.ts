import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../db/schema";
import { environments } from "./environment.config";
export const pool = new Pool({
  connectionString: environments.dbUrl,
  ssl: false,
});

export const db = drizzle(pool, { schema });
