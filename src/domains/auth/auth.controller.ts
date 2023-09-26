import { ZodError } from "zod";
import { LoginSchema, RegisterSchema } from "./auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { createUser } from "./auth.services";
export async function loginController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const parsedBody = LoginSchema.parse(req.body);

    reply.code(201).send({ message: parsedBody });
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
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
