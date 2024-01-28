// Auth middlware for protected routes
import { FastifyRequest, FastifyReply } from "fastify";
// import redis from "../config/redis-client";
import { endpoints } from "../config/default.config";
import { csts } from "../config/consts";
export default async function checkAuthentication(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    if (!request.session.authenticated) {
      request.session.destroy((err: any) => {
        if (err) {
          console.log(err);
          return reply.status(500).send("Internal Server Error");
        } else {
          return reply
            .code(401)
            .redirect(endpoints.homeUrl)
            .clearCookie("sessionId");
        }
      });
    }
  } catch (err) {
    console.log(err);
    reply.code(500).redirect(endpoints.homeUrl);
  }
}
