import "dotenv/config";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { dbc, connection } from "../config/drizzle-client";

// This will run migrations on the database, skipping the ones already applied
async function migrating() {
  const db = await dbc();
  await migrate(db, { migrationsFolder: "src/db/drizzle" });

  // Don't forget to close the connection, otherwise the script will hang
  (await connection).end();
}
migrating();
