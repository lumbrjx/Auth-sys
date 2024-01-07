import loadEnv, { config } from "./src/config/environment.config";
import type { Config } from "drizzle-kit";

const currentEnvironment = process.env.NODE_ENV || "development";
loadEnv(currentEnvironment);
const urls = {
  schema:
    process.env.NODE_ENV === "development"
      ? "./src/db/schema.ts"
      : "./dist/src/db/schema.js",
  out:
    process.env.NODE_ENV === "development"
      ? "./src/db/drizzle"
      : "./dist/src/db/drizzle",
};
export default {
  schema: urls.schema,
  out: urls.out,
  breakpoints: true,
  driver: "pg",
  dbCredentials: {
    connectionString: config?.dbUrl as string,
    ssl: false,
  },
  verbose: true,
  strict: true,
} satisfies Config;
