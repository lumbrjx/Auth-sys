import { beforeAll, suite, expect, test, afterAll } from "vitest";
import { createUser } from "../../domains/auth/auth.services";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../db/schema";
//failing

export const customerRepositoryTests = suite("Customer Repository", () => {
  test("creates new user", async () => {
    expect(
      await createUser({
        username: "jhon",
        email: "doe",
        password: "superpassword",
      })
    ).toBe("INSERT");
  });
});
