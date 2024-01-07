import { Result } from "../../result.model";
import bcrypt from "bcrypt";
import { csts } from "../../config/consts";
import { userType } from "./auth.model";
import { FastifyReply } from "fastify";

interface parsedBodyType {
  password: string;
  email: string;
}

export async function validateUser(
  userResult: Result<userType | undefined, string | Error | undefined>,
  parsedBody: parsedBodyType,
  reply: FastifyReply
) {
  if (!userResult.success) {
    reply
      .code(401)
      .send({
        ok: false,
        error: userResult.error ?? "Invalid passowrd or email",
      });
    // errGen(401, userResult.error?.toString() ?? "Invalid passowrd or email");
  }
  const existingUser = userResult.data;
  if (existingUser?.type === csts.OAUTH) {
    return reply.code(401).send({ ok: false, error: "Invalid operation" });
    // errGen(401, "Invalid operation");
  }
  const match = await bcrypt.compare(
    parsedBody.password,
    existingUser?.password as string
  );
  if (match === false) {
    reply.code(401).send({ ok: false, error: "Invalid passowrd or email" });
    // errGen(401, "Invalid passowrd or email");
  }
  return existingUser;
}
