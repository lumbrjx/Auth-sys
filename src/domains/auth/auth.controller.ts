import { LoginSchema, RegisterSchema, tfacodeSchema } from "./auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, getUser } from "./auth.services";
import redis from "../../config/redis-client";
import { generate2FACode } from "../../lib/auth-utils/2fa-code-gen";
import bcrypt from "bcrypt";
import { csts } from "../../config/consts";
import { validateUser } from "./auth.validator";
import { createRedisSession } from "../../lib/auth-utils/redis-session";
// Login
export async function loginController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  // try {
  const parsedBody = LoginSchema.parse(req.body);
  const userResult = await getUser(parsedBody.email, false);
  const existingUser = await validateUser(userResult, parsedBody, reply);
  if (existingUser?.TWO_FA === true) {
    const tfaToken = generate2FACode(parsedBody);
    return reply
      .code(200)
      .send({ ok: true, message: "2FA code is sent " + tfaToken });
  }
  await createRedisSession(req, existingUser);

  return reply.status(200).send({ ok: true, message: "Authorized" });
  // } catch (error: any) {
  //   if (error instanceof ZodError) {
  //     return reply.status(400).send({ error: error.issues[0].message });
  //   } else {
  //     return reply.status(500).send({ error: "Internal Server Error" });
  //   }
  // }
}
// 2FA post code generation
export async function tfagenController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  // try {
  const parsedBody = tfacodeSchema.parse(req.body);
  const { user } = (await req.params) as any;
  if (!user) {
    reply.code(400).send("Error logging in please try again");
  }
  const tfauser = await redis.get(csts.TWO_FACTOR_AUTH + user);
  if (tfauser === null) {
    return reply.code(401).send("Unauthorized");
  }
  if (tfauser.trim() !== parsedBody.code.trim()) {
    return reply.code(401).send("invalid 2fa code");
  }
  const userResult = await getUser(user.trim(), false);
  if (!userResult.success) {
    reply.code(401).send(userResult.error ?? "Invalid passowrd or email");
  }

  await createRedisSession(req, userResult.data);
  await redis.del(csts.TWO_FACTOR_AUTH + user);
  return reply.status(200).send({ ok: true, message: "Authorized" });
  // } catch (error: any) {
  //   if (error instanceof ZodError) {
  //     return reply.status(400).send({ error: error.issues[0].message });
  //   } else {
  //     return reply.status(500).send({ error: "Internal Server Error" });
  //   }
  // }
}
// Register
export async function reigsterController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  // try {
  const parsedBody = RegisterSchema.parse(req.body);
  const userResult = await getUser(parsedBody.email, false);
  if (userResult.data?.email === parsedBody.email) {
    return reply.code(400).send({
      ok: false,
      error: userResult.error ?? "cannot create a user",
    });
    // errGen(401, userResult.error?.toString() ?? "Invalid passowrd or email");
  }
  bcrypt.hash(parsedBody.password, 10, async (err: any, hash: string) => {
    await createUser({ ...parsedBody, password: hash });
  });

  reply.code(201).send({ ok: true, message: "created" });
  // } catch (error: any) {
  //   if (error instanceof ZodError) {
  //     reply.status(400).send({ error: error.issues[0].message });
  //   } else {
  //     reply.status(500).send({ error: "Internal Server Error" });
  //   }
  // }
}
// OAUTH2, 2fa-, cookie
