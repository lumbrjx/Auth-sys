import { FastifyRequest, FastifyReply } from "fastify";

export default async function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Access the Redis client through the fastify instance
    const session = await request.server.redis.get(request.session.sessionId);
    if (session === null) {
      console.log("no session");
      reply.redirect("/");
    }
  } catch (err) {
    console.log("Error while trying to authenticate, Please login again.");

    reply.redirect("/");
  }
}
