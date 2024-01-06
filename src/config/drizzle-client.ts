import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../db/schema";
export const pool = new Pool({
  connectionString:
    "postgres://root:LdsfgjpmLDSFg8941sdfgsdfc@localhost:5432/pgs_database",
  ssl: false,
});

export const db = drizzle(pool, { schema });
