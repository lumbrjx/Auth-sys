// Auth middlware for protected routes
import { FastifyRequest, FastifyReply } from "fastify";
import redis from "../config/redis-client";
import { endpoints } from "../config/default.config";
import { csts } from "../config/consts";
export default async function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const session = await redis.get(request.session.get(csts.COOKIE));
    console.log(session);
    if (session === null) {
      reply.code(401).redirect(endpoints.homeUrl);
    }
  } catch (err) {
    reply.code(500).redirect(endpoints.homeUrl);
  }
}
