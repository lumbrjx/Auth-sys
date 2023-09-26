// session config
import { FastifyInstance } from "fastify";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import dotenv from "dotenv";
dotenv.config();
async function configureSession(fastify: FastifyInstance) {
  fastify.register(fastifyCookie);

  fastify.register(fastifySession, {
    store: fastify.redis,
    secret: process.env.SESSION_SECRET as string,
    cookie: {
      secure: false,
      sameSite: "none",
      maxAge: 120000,
    },
  });
}

export default configureSession;
