import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/drizzle",
  breakpoints: true,
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.PG_DATABASE as string,
    ssl: false,
  },
  verbose: true,
  strict: true,
} satisfies Config;
