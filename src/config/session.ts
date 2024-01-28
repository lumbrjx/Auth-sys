// session config
import { FastifyInstance } from "fastify";
import { endpoints, cookiesConf } from "./default.config";
import { store } from "./redis-client";
import fastifySession from "@fastify/session";
declare module "fastify" {
  interface Session {
    authenticated: boolean;
    email: string;
  }
}
async function configureSession(fastify: FastifyInstance) {
  // fastify.register(fastifySecureSession, {
  //   // the name of the attribute decorated on the request-object, defaults to 'session'
  //   sessionName: cookiesConf.sessionName,
  //   // the name of the session cookie, defaults to value of sessionName
  //   cookieName: cookiesConf.cookiename,
  //   // adapt this to point to the directory where secret-key is located
  //   secret: process.env.SECRET as string,
  //   salt: process.env.SALT as string,
  //   cookie: {
  //     maxAge: cookiesConf.maxage,
  //     path: endpoints.home,
  //   },
  // });

  // fastify.register(fastifyCookie, {});
  fastify.register(fastifySession, {
    secret: process.env.SECRET as string,
    cookieName: cookiesConf.cookiename,
    saveUninitialized: false,

    cookie: {
      secure: false,
      maxAge: cookiesConf.maxage,
      path: "/",
      sameSite: "none",
    },
    store,
  });
}
export default configureSession;
