import { FastifyReply, FastifyRequest } from "fastify";
import redis from "../config/redis-client";

export default async function authorizer(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    if (
      request.url.trim() === "/login/google" ||
      request.url.trim() === "/login" ||
      request.url.trim() === "/register"
    ) {
      const session = await redis.get(request.session.get("cookie"));
      if (session) {
        console.log("already signed in");
        reply.code(401).redirect("http://localhost:8080/");
      }
    }
  } catch (err) {
    console.log("Error while trying to authorize, Please login again.");

    reply.code(500).redirect("http://localhost:8080/");
  }
}
