import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/drizzle",
  breakpoints: true,
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.MYSQL_DATABASE_URL as string,
  },
} satisfies Config;
