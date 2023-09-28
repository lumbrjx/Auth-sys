import prisma from "../../config/prisma-client";
import { RegisterData } from "./auth.model";

export async function createUser(user: RegisterData) {
  const newUser = await prisma.user.create({
    data: {
      username: user.username,
      password: user.password,
      email: user.email,
      preference: user.preference,
      type: "CREDENTIALS",
    },
  });
  return newUser;
}

export async function getUser(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  return user;
}

module.exports = {
  createUser,
  getUser,
};
