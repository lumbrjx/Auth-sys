import { FastifyRequest, FastifyReply } from "fastify";
import redis from "../config/redis-client";
export default async function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Access the Redis client through the fastify instance
    const session = await redis.get(request.session.get("cookie"));
    if (session === null) {
      console.log("no session");
      reply.code(401).redirect("http://localhost:8080/");
    }
  } catch (err) {
    console.log("Error while trying to authenticate, Please login again.");

    reply.code(500).redirect("http://localhost:8080/");
  }
}
