import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../config/redis-client";
import * as confdata from "../config/default.json";
export default async function authorizer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    if (
      request.url.trim() === confdata.oauth_start_redirect_path ||
      request.url.trim() === confdata.login ||
      request.url.trim() === confdata.register ||
      request.url.trim().includes(confdata.tfaLogin)
    ) {
      const session = await redis.get(request.session.get("cookie"));
      if (session) {
        reply.code(401).redirect(confdata.homeUrl);
      }
    }
  } catch (err) {
    reply.code(500).redirect(confdata.homeUrl);
  }
}
