import prisma, { user } from "../../config/prisma-client";
import { Result, parseToResult } from "../../result.model";
import { RegisterData } from "./auth.model";

// Create new user in DB
export async function createUser(user: RegisterData) {
  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
      email: user.email,
      type: "CREDENTIALS",
    },
  });
  return newUser;
}

// Get a user from DB
export async function getUser(
  email: string,
): Promise<Result<user | undefined | null, Error | undefined>> {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return parseToResult(user);
  } catch (error) {
    return parseToResult(undefined, error as Error);
  }
}

// Edit user's password
export async function editPassword(
  password: string,
  email: string,
): Promise<Result<user | undefined | null, Error | undefined>> {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: password,
      },
    });
    return parseToResult(user);
  } catch (error) {
    return parseToResult(undefined, error as Error);
  }
}

// Edit 2FA state
export async function edit2fa(
  email: string,
  tfaemail: string | null,
  type: boolean,
): Promise<Result<user | undefined | null, Error | undefined>> {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        twoFaEmail: tfaemail,
        TWO_FA: type,
      },
    });
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
