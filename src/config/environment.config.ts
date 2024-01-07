import dotenv from "dotenv";

interface AppConfig {
  apiUrl: string;
  dbUrl?: string;
  schema?: string;
  out?: string;
}

interface EnvConfig {
  [key: string]: string;
}

const loadEnv = (env: string): void => {
  const result = dotenv.config({
    path: `.env.${env}`,
  });

  if (result.error) {
    throw result.error;
  }
};

export default loadEnv;

const environments: Record<string, AppConfig> = {
  development: {
    apiUrl: "http://localhost:3000",
    dbUrl:
      "postgres://root:LdsfgjpmLDSFg8941sdfgsdfc@localhost:5432/pgs_database",
    schema: "./src/db/schema.ts",
    out: "./src/db/drizzle",
  },
  testing: {
    apiUrl: "http://localhost:3000",
    dbUrl:
      "postgres://root:LdsfgjpmLDSFg8941sdfgsdfc@localhost:5432/pgs_database",
  },
  production: {
    apiUrl: "",
    schema: "./dist/src/db/schema.ts",
    out: "./dist/src/db/drizzle",
  },
};

const currentEnvironment = process.env.NODE_ENV || "development";

export const config: AppConfig = environments[currentEnvironment];
