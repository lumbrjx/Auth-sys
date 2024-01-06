import { beforeAll, suite, expect, test, afterAll } from "vitest";
import {
  createUser,
  edit2fa,
  editPassword,
  getUser,
} from "../../domains/auth/auth.services";
import { dbSeed } from "../../lib/utils/seed";
import * as schema from "../../db/schema";
import { db } from "../../config/drizzle-client";

export const GETmethodsTests = suite("GET methods", () => {
  // seed the db
  beforeAll(async () => {
    await dbSeed.forEach((user) => createUser(user));
  });
  // delete the dummy data after finishing
  afterAll(async () => {
    await db.delete(schema.user);
  });
  // create a new user
  test("creates new user", async () => {
    expect(
      await createUser({
        username: "jhonn",
        email: "doee",
        password: "superpassword",
      })
    ).toStrictEqual({
      data: "INSERT",
      error: undefined,
      success: true,
    });
  });

  // creating the same user twice
  test("creates new user twice", async () => {
    expect(
      await createUser({
        username: "jhonn",
        email: "doee",
        password: "superpassword",
      })
    ).toStrictEqual({
      data: undefined,
      error: "user_username_unique",
      success: false,
    });
  });
  // get all users in db
  test("get a user", async () => {
    expect(await getUser("graham@yahoo.com", false)).toStrictEqual({
      data: {
        TWO_FA: false,
        email: "graham@yahoo.com",
        oauthToken: null,
        password: "super33password",
        twoFaEmail: null,
        type: "CREDENTIALS",
        username: "ashley",
      },
      error: undefined,
      success: true,
    });
  });
  // try non existing user
  test("get a non existing user", async () => {
    expect(await getUser("doesntexists@gmail", false)).toStrictEqual({
      data: undefined,
      error: "user doesn't exist",
      success: false,
    });
  });

  test("editing passowrd", async () => {
    expect(
      await editPassword("editedpassowrd", "hector@gmail.com")
    ).toStrictEqual({
      data: "hector@gmail.com",
      error: undefined,
      success: true,
    });
  });

  test("editing passowrd with unexsisting email", async () => {
    expect(
      await editPassword("editedpassowrd", "doesntexist@gmail.com")
    ).toStrictEqual({
      data: undefined,
      error: "user doesn't exist",
      success: false,
    });
  });

  test("set 2FA to true", async () => {
    expect(
      await edit2fa("babe@yahoo.com", "babe@yahoo.com", true)
    ).toStrictEqual({
      data: {
        usertfaEmail: "babe@yahoo.com",
        tfa: true,
      },
      error: undefined,
      success: true,
    });
  });

  test("set 2FA to false", async () => {
    expect(
      await edit2fa("babe@yahoo.com", "babe@yahoo.com", false)
    ).toStrictEqual({
      data: {
        usertfaEmail: "babe@yahoo.com",
        tfa: false,
      },
      error: undefined,
      success: true,
    });
  });

  test("set 2FA to true with unexsisting email", async () => {
    expect(
      await edit2fa("neverexists@yahoo.com", "babe@yahoo.com", true)
    ).toStrictEqual({
      data: undefined,
      error: "user doesn't exist",
      success: false,
    });
  });
});
