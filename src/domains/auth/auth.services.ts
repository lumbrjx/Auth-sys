import prisma, { user } from "../../config/prisma-client";
import { Result, parseToResult } from "../../result.model";
import { RegisterData } from "./auth.model";

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

export async function getUser(
  email: string
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
export async function editPassword(
  password: string,
  email: string
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
module.exports = {
  createUser,
  getUser,
  editPassword,
};
