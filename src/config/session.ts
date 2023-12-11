// session config
import { FastifyInstance } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from "@fastify/secure-session";
import * as confdata from "./default.json";
async function configureSession(fastify: FastifyInstance) {
  fastify.register(fastifyCookie);
  fastify.register(fastifySecureSession, {
    // the name of the attribute decorated on the request-object, defaults to 'session'
    sessionName: confdata.cookiesConf.sessionName,
    // the name of the session cookie, defaults to value of sessionName
    cookieName: confdata.cookiesConf.cookiename,
    // adapt this to point to the directory where secret-key is located
    secret: process.env.SECRET as string,
    salt: process.env.SALT as string,
    cookie: {
      maxAge: confdata.cookiesConf.maxage,
      path: confdata.home,
    },
  });
}

export default configureSession;
