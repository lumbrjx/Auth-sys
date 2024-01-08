import { environments } from "./src/config/environment.config";
import type { Config } from "drizzle-kit";
// const urls = {
//   schema:
//     process.env.NODE_ENV === "development"
//       ? "./src/db/schema.ts"
//       : "./dist/src/db/schema.js",
//   out:
//     process.env.NODE_ENV === "development"
//       ? "./src/db/drizzle"
//       : "./dist/src/db/drizzle",
// };
export default {
  schema: environments.schema,
  out: environments.out,
  breakpoints: true,
  driver: "pg",
  dbCredentials: {
    connectionString: environments.dbUrl as string,
    ssl: false,
  },
  verbose: true,
  strict: false,
} satisfies Config;
