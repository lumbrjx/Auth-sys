import { FastifyError, FastifyReply, errorCodes } from "fastify";

export default async function errHandler(
  error: FastifyError,
  reply: FastifyReply
) {
  if (error instanceof errorCodes.FST_ERR_NOT_FOUND) {
    return reply.status(404).send({ ok: false });
  }
  if (error instanceof errorCodes.FST_ERR_NOT_FOUND) {
    return reply.status(404).send({ ok: false });
  }
}
