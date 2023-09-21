import { ZodError } from "zod";
import { RegisterSchema } from "../models/auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
export default async function reigsterController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const parsedBody = RegisterSchema.parse(req.body);

    reply.code(201).send({ message: parsedBody });
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
