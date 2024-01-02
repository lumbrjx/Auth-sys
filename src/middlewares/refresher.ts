import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../config/redis-client";
import { endpoints, redisConf } from "../config/default.config";
import { csts } from "../config/consts";
export default async function refresher(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const session = await redis.get(request.session.get(csts.COOKIE));
    if (!session) return;
    const sessionparsed = await JSON.parse(session as string);
    const sessionTTL = await redis.ttl(sessionparsed.sessionId);
    if (sessionTTL < 60) {
      await redis.expire(sessionparsed.sessionId, redisConf.sessionExp);
    }
  } catch (err) {
    reply.code(500).redirect(endpoints.homeUrl);
  }
}
