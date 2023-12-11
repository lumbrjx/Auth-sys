import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../config/redis-client";
import * as confdata from "../config/default.json";
export default async function refresher(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const session = await redis.get(request.session.get("cookie"));
    if (!session) return;
    const sessionparsed = await JSON.parse(session as string);
    const sessionTTL = await redis.ttl(sessionparsed.sessionId);
    // PRO Tip: do you know, that using redis.setex can allow you to set ttl for a key? :O
    //  using that will automagically remove this middleware and the insane overhead on per-request checking :>
    if (sessionTTL < 60) {
      await redis.expire(
        sessionparsed.sessionId,
        confdata.redisConf.sessionExp,
      );
    }
  } catch (err) {
    reply.code(500).redirect(confdata.homeUrl);
  }
}
