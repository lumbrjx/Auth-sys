import fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
export default async function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { redis } = fastify as any;

  try {
    const session = await redis.get(request.session.sessionId);
    console.log(request.url);
    if (session && request.url === "/login/google") {
      console.log("you're already signed in");
      reply.redirect("/");
    }
  } catch (err) {
    console.error(err);
  }
  // Check if the session exists in Redis
}
