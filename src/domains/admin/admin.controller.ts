import { FastifyReply, FastifyRequest } from "fastify";

export async function adminController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.send(request.url);
}
