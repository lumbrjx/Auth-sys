import { mysqlTable, varchar, boolean } from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 128 })
    .$defaultFn(() => createId())
    .primaryKey()
    .unique(),
  username: varchar("username", { length: 256 }).unique(),
  password: varchar("password", { length: 256 }),
  oauthToken: varchar("oauthToken", { length: 256 }),
  email: varchar("email", { length: 256 }).unique(),
  type: varchar("type", { length: 256 }),
  TWO_FA: boolean("TWO_FA").default(false),
  twoFaEmail: varchar("twoFaEmail", { length: 256 }),
});
