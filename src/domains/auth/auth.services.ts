import prisma from "../../client/prisma-client";
import { RegisterData } from "./auth.model";
export async function createUser(user: RegisterData) {
  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
      email: user.email,
      preference: user.preference,
    },
  });
  return newUser;
}

module.exports = {
  createUser,
};
