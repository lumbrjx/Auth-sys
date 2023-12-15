import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

export const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "LdsfgjpmLDSFg8941sdfgsdfc",
  database: "prisma-mysql",
  multipleStatements: true,
});

export async function dbc() {
  const db = drizzle(await connection);
  return db;
}
