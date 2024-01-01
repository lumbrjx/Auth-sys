import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../config/redis-client";
import { endpoints } from "../config/default.config";
export default async function authorizer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    if (
      request.url.trim() === endpoints.oauth_start_redirect_path ||
      request.url.trim() === endpoints.login ||
      request.url.trim() === endpoints.register ||
      request.url.trim().includes(endpoints.tfaLogin)
    ) {
      const session = await redis.get(request.session.get("cookie"));
      if (session) {
        reply.code(401).redirect(endpoints.homeUrl);
      }
    }
  } catch (err) {
    reply.code(500).redirect(endpoints.homeUrl);
  }
}
