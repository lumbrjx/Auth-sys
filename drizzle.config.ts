import loadEnv, { config } from "./src/config/environment.config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/drizzle",
  breakpoints: true,
  driver: "pg",
  dbCredentials: {
    connectionString: config?.dbUrl as string,
    ssl: false,
  },
  verbose: true,
  strict: true,
} satisfies Config;
