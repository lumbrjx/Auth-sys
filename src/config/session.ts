// session config
import { FastifyInstance } from "fastify";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import redis from "./redis-client";
import fastifySecureSession from "@fastify/secure-session";

async function configureSession(fastify: FastifyInstance) {
  fastify.register(fastifyCookie);

  fastify.register(fastifySecureSession, {
    // the name of the attribute decorated on the request-object, defaults to 'session'
    sessionName: "session",
    // the name of the session cookie, defaults to value of sessionName
    cookieName: "my-session-cookie",
    // adapt this to point to the directory where secret-key is located
    secret: "qsdqfghhsdfghhgdsgsdfgsfdg87sdqf7qd",
    salt: "qsfqhfjkqsdfqjsk",
    cookie: {
      maxAge: 12000,
      path: "/",

      // options for setCookie, see https://github.com/fastify/fastify-cookie
    },
  });
}

export default configureSession;
