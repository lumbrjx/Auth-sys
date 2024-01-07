import { csts } from "../../../config/consts";
import { endpoints, redisConf } from "../../../config/default.config";
import redis from "../../../config/redis-client";
import { FastifyReply, FastifyRequest } from "fastify";

export async function refreshController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await redis.expire(req.session.get(csts.COOKIE), redisConf.sessionExp);
    return reply.code(200).send({
      ok: true,
      message: "refreshed",
    });
  } catch (err) {
    reply.code(500).redirect(endpoints.homeUrl);
  }
}
