import { Client } from "pg";
import { beforeAll, suite, expect, test, afterAll } from "vitest";
import { createUser } from "../../domains/auth/auth.services";
import { PostgreSqlContainer } from "@testcontainers/postgresql";
//failing

export const customerRepositoryTests = suite("Customer Repository", () => {
  let postgresClient: any;
  let postgresContainer: any;
  beforeAll(async () => {
    const postgresContainer = await new PostgreSqlContainer().start();
    const postgresClient = new Client({
      connectionString: postgresContainer.getConnectionUri(),
    });
    await postgresClient.connect();
  });

  afterAll(async () => {
    await postgresClient.end();
    await postgresContainer.stop();
  });

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
