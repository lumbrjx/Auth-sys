import { FastifyReply, FastifyRequest } from "fastify";

export async function adminController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  return reply.send(request.url);
}
