import { createId } from "@paralleldrive/cuid2";
import { csts } from "../../config/consts";
import { FastifyRequest } from "fastify";
import redis from "../../config/redis-client";
import { redisConf } from "../../config/default.config";
import { userType } from "../../domains/auth/auth.model";

export async function createRedisSession(
  req: FastifyRequest,
  existingUser: userType | undefined
) {
  const sessionId = createId();
  req.session.set(csts.COOKIE, sessionId);
  await redis.set(
    sessionId,
    JSON.stringify({ ...existingUser, sessionId: sessionId })
  );
  // TTL
  await redis.expire(sessionId, redisConf.sessionExp);
}
