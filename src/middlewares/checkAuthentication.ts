// Auth middlware for protected routes
import { FastifyRequest, FastifyReply } from "fastify";
import redis from "../config/redis-client";
import * as confdata from "../config/default.json";
export default async function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const session = await redis.get(request.session.get("cookie"));
    console.log(session);
    // from session == null -> !session, because why not
    if (!session) {
      reply.code(401).redirect(confdata.homeUrl);
    }
  } catch (err) {
    reply.code(500).redirect(confdata.homeUrl);
  }
}
