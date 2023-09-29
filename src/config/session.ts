// session config
import { FastifyInstance } from "fastify";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";

async function configureSession(fastify: FastifyInstance) {
  fastify.register(fastifyCookie);

  fastify.register(fastifySession, {
    secret: process.env.SESSION_SECRET as string,
    cookie: {
      secure: false,
      sameSite: "none",
      maxAge: 120000,
    },
  });
}

export default configureSession;
