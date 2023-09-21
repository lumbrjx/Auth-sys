import { ZodError } from "zod";
import { LoginRequestBody, MySchema } from "../models/login.model";
import { FastifyRequest, FastifyReply } from "fastify";
export default async function loginController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const { username, password } = (await req.body) as LoginRequestBody;
  try {
    const parsedBody = MySchema.parse(req.body);

    reply.code(201).send({ message: parsedBody });
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
