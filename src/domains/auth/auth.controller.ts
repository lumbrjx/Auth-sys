import { ZodError } from "zod";
import { LoginSchema, RegisterSchema } from "./auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { createUser, getUser } from "./auth.services";
import redis from "../../config/redis-client";

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

    if (existingUser?.type === "OAUTH2") {
      return reply.code(401).send("Invalid operation");
    }
    if (existingUser?.password !== parsedBody.password) {
      return reply.code(401).send("Invalid passowrd or email");
    }
    // No need to branch here, always prevent from more nested branching, so you can remove this code comment
    // if (existingUser?.password === parsedBody.password) {
    await redis.set(
      req.session.sessionId,

      JSON.stringify({ ...existingUser, sessionId: req.session.sessionId })
    );
    // TTL
    await redis.expire(req.session.sessionId, 180);
    return reply.send("Authorized");
    // }
  } catch (error: any) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.issues[0].message });
    } else {
      console.log(error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}

export async function reigsterController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const parsedBody = RegisterSchema.parse(req.body);
    await createUser(parsedBody);
    reply.code(201).send({ message: parsedBody });
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
