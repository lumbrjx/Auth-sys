import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../config/redis-client";
export default async function refresher(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const session = await redis.get(request.session.get("cookie"));
    if (!session) return;
    const sessionparsed = await JSON.parse(session as string);
    const sessionTTL = await redis.ttl(sessionparsed.sessionId);
    if (sessionTTL < 60) {
      await redis.expire(sessionparsed.sessionId, 180);
    }
  } catch (err) {
    console.log("Error while trying to refresh, Please login again.");
    reply.code(500).redirect("http://localhost:8080/");
  }
}
