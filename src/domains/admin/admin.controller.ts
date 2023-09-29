import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../../config/redis-client";

export async function adminController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  reply.send("super sensitive data is sent");

  await redis.expire(request.session.sessionId, 180);
}
