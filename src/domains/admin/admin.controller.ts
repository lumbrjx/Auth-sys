import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../../config/redis-client";

export async function adminController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.log(request.url);
  reply.send(request.url);

  await redis.expire(request.session.sessionId, 180);
}
