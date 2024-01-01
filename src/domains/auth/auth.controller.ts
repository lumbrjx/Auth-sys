import { ZodError } from "zod";
import { LoginSchema, RegisterSchema, tfacodeSchema } from "./auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, getUser } from "./auth.services";
import redis from "../../config/redis-client";
import { createId } from "@paralleldrive/cuid2";
import { generateRandom6DigitNumber } from "../../lib/utils/2fa-code-gen";
import bcrypt from "bcrypt";
import { redisConf } from "../../config/default.config";
import { csts } from "config/consts";
// Login
export async function loginController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const parsedBody = LoginSchema.parse(req.body);
    const userResult = await getUser(parsedBody.email);
    if (!userResult.success) {
      reply
        .code(401)
        .send(userResult.error?.message ?? "Invalid passowrd or email");
    }
    const existingUser = userResult.data;
    if (existingUser?.type === csts.OAUTH) {
      return reply.code(401).send("Invalid operation");
    }
    const match = await bcrypt.compare(
      parsedBody.password,
      existingUser?.password as string
    );
    if (match === false) {
      reply.code(401).send("Invalid passowrd or email");
    }
    if (existingUser?.TWO_FA === true) {
      const tfaToken = generateRandom6DigitNumber();
      await redis.set(csts.TWO_FACTOR_AUTH + parsedBody.email, tfaToken);
      await redis.expire(
        csts.TWO_FACTOR_AUTH + parsedBody.email,
        redisConf.tfaTokenExp
      );
      return reply.code(200).send("2FA code is sent " + tfaToken);
    }
    const sessionId = createId();
    req.session.set(csts.COOKIE, sessionId);
    await redis.set(
      sessionId,
      JSON.stringify({ ...existingUser, sessionId: sessionId })
    );
    // TTL
    await redis.expire(sessionId, redisConf.sessionExp);
    return reply.send("Authorized");
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.issues[0].message });
    } else {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
// 2FA post code generation
export async function tfagenController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
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
    const userResult = await getUser(user.trim());
    if (!userResult.success) {
      reply
        .code(401)
        .send(userResult.error?.message ?? "Invalid passowrd or email");
    }
    const existingUser = userResult.data;
    const sessionId = createId();
    req.session.set(csts.COOKIE, sessionId);
    await redis.set(
      sessionId,
      JSON.stringify({ ...existingUser, sessionId: sessionId })
    );
    // TTL
    await redis.expire(sessionId, 180);
    await redis.del(csts.TWO_FACTOR_AUTH + user);
    return reply.send("Authorized");
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.issues[0].message });
    } else {
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
// Register
export async function reigsterController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const parsedBody = RegisterSchema.parse(req.body);
    await bcrypt.hash(parsedBody.password, 10, (err: any, hash: string) => {
      createUser({ ...parsedBody, password: hash });
    });
    reply.code(201).send({ message: parsedBody });
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
// OAUTH2, 2fa-, cookie
