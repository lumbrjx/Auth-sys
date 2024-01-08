// session config
import { FastifyInstance } from "fastify";
// import fastifyCookie from "@fastify/cookie";
import fastifySecureSession from "@fastify/secure-session";
import { endpoints, cookiesConf } from "./default.config";
async function configureSession(fastify: FastifyInstance) {
  fastify.register(fastifySecureSession, {
    // the name of the attribute decorated on the request-object, defaults to 'session'
    sessionName: cookiesConf.sessionName,
    // the name of the session cookie, defaults to value of sessionName
    cookieName: cookiesConf.cookiename,
    // adapt this to point to the directory where secret-key is located
    secret: process.env.SECRET as string,
    salt: process.env.SALT as string,
    cookie: {
      maxAge: cookiesConf.maxage,
      path: endpoints.home,
    },
  });
}

export default configureSession;
