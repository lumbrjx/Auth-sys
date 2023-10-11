import { FastifyReply, FastifyRequest } from "fastify";

export async function adminController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.log(request.url);
  reply.send(request.url);
}
