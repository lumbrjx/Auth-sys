import { FastifyRequest, FastifyReply } from "fastify";

export default async function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    console.log(request.session.sessionId);

    // Access the Redis client through the fastify instance
    const session = await request.server.redis.get(request.session.sessionId);
    console.log("im session", session);
    if (session === null) {
      console.log("no session");
      reply.redirect("/");
    }
    console.log(request.url);
    if (session && request.url === "/login/google") {
      console.log("you're already signed in");
      reply.redirect("/");
    }
  } catch (err) {
    console.log("not authorized");

    reply.redirect("/");
  }
}
