// Auth middlware for protected routes
import { FastifyRequest, FastifyReply } from "fastify";
import redis from "../config/redis-client";
import { endpoints } from "../config/default.config";
export default async function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const session = await redis.get(request.session.get("cookie"));
    console.log(session);
    if (session === null) {
      reply.code(401).redirect(endpoints.homeUrl);
    }
  } catch (err) {
    reply.code(500).redirect(endpoints.homeUrl);
  }
}
