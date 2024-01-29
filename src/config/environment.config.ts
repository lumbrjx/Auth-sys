interface AppConfig {
  apiUrl: string;
  dbUrl?: string;
  schema?: string;
  out?: string;
}

export const environments: AppConfig = {
  apiUrl: process.env.API_URL as string,
  dbUrl: process.env.VITE_PG_DATABASE as string,
  schema: process.env.VITE_DB_SCHEMA_PATH as string,
  out: process.env.VITE_DB_OUT_PATH,
};
