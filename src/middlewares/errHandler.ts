import { FastifyError, FastifyReply, errorCodes } from "fastify";
import { ZodError } from "zod";

export default async function errHandler(
  error: FastifyError,
  reply: FastifyReply
) {
  if (error instanceof errorCodes.FST_ERR_NOT_FOUND) {
    return reply.status(404).send({ ok: false });
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ ok: false, error: error.issues[0].message });
  }
  return reply.status(500).send({ ok: false, error: "Internal server error" });
}
