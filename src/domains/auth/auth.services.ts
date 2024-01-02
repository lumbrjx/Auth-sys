import { db } from "../../config/drizzle-client";
import { Result, parseToResult } from "../../result.model";
import { RegisterData } from "./auth.model";
import * as schema from "../../db/schema";
// Create new user in DB
interface userType {
  id: string;
  username: string | null;
  password: string | null;
  oauthToken: string | null;
  email: string;
  type: string | null;
  TWO_FA: boolean | null;
  twoFaEmail: string | null;
}

export async function createUser(user: RegisterData) {
  const newUser = await db.insert(schema.user).values({
    username: user.username,
    password: user.password,
    email: user.email,
    type: "CREDENTIALS",
  });

  return newUser.command;
}
// Get a user from DB
export async function getUser(
  email: string
): Promise<Result<userType | undefined, Error | undefined>> {
  try {
    const user = await db.query.user.findFirst({
      with: {
        email: email,
      },
    });
    console.log(user);
    return parseToResult(await user);
  } catch (error) {
    return parseToResult(undefined, error as Error);
  }
}
// Edit user's password
export async function editPassword(
  password: string,
  email: string
): Promise<Result<string | undefined | null, Error | undefined>> {
  try {
    // const user = await prisma.user.update({
    //   where: {
    //     email: email,
    //   },
    //   data: {
    //     password: password,
    //   },
    // });
    const user = "hey";
    return parseToResult(user);
  } catch (error) {
    return parseToResult(undefined, error as Error);
  }
}
// Edit 2FA state
export async function edit2fa(
  email: string,
  tfaemail: string | null,
  type: boolean
): Promise<Result<string | undefined | null, Error | undefined>> {
  try {
    // const user = await prisma.user.update({
    //   where: {
    //     email: email,
    //   },
    //   data: {
    //     twoFaEmail: tfaemail,
    //     TWO_FA: type,
    //   },
    // });
    const user = "hey";
    return parseToResult(user);
  } catch (error) {
    return parseToResult(undefined, error as Error);
  }
}

module.exports = {
  createUser,
  getUser,
  editPassword,
  edit2fa,
};
