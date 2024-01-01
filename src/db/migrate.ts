import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "../config/drizzle-client";

// This will run migrations on the database, skipping the ones already applied
async function migrating() {
  await migrate(db, { migrationsFolder: "src/db/drizzle" });

  // Don't forget to close the connection, otherwise the script will hang
  await pool.end();
}
migrating();
