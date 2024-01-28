import fastify from "fastify";
import configureSession from "./config/session";
import configureOAuth2 from "./config/oauth";
import dotenv from "dotenv";
import authorizer from "./middlewares/authorizer";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
dotenv.config();
const server = fastify({
  logger: false,
});

server.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
server.addHook("preHandler", authorizer); // Post session authorizer

configureOAuth2(server); // oauth provider
// server.register(fastifyCookie)
configureSession(server); // session config
server.register(import("./domains/auth/auth.route")); // credentials auth routes
server.register(import("./domains/auth/oauth/oauth.route")); // oauth routes
server.register(import("./domains/auth/reset/reset.route")); // Reset password routes
server.register(import("./domains/auth/2FA/2FA.route")); // 2fa routes
server.register(import("./domains/admin/admin.route")); // protected route
server.get("/", (request, reply) => {
  reply.send("auth sys by clog");
});

const PORT = parseInt(process.env.PORT ?? "") || 8080;

server.listen({ port: PORT, host: process.env.HOST }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
