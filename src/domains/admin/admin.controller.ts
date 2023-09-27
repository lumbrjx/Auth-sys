import { FastifyReply, FastifyRequest } from "fastify";

export async function adminController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.send("super sensitive data is sent");

  await request.server.redis.expire(request.session.sessionId, 180);
}
