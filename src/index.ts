import fastify from "fastify";
import configureSession from "./config/session";
import configureOAuth2 from "./config/oauth";
import dotenv from "dotenv";
import authorizer from "./middlewares/authorizer";
import refresher from "./middlewares/refresher";
import cors from "@fastify/cors";
dotenv.config();
console.log("testing work");
const server = fastify({
  logger: false,
});

server.register(cors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});
server.addHook("preHandler", authorizer); // Post session authorizer
server.addHook("preHandler", refresher); // Session refresher

configureOAuth2(server); // oauth provider
configureSession(server); // session config

server.register(import("./domains/auth/auth.route")); // credentials auth routes
server.register(import("./domains/auth/oauth/oauth.route")); // oauth routes
server.register(import("./domains/auth/reset/reset.route")); // Reset password routes
server.register(import("./domains/auth/2FA/2FA.route")); // 2fa routes
server.register(import("./domains/admin/admin.route")); // protected route

server.get("/", async (request, reply) => {
  reply.send("Auth System example made by CLOG9");
});

const PORT = parseInt(process.env.PORT ?? "") || 8080;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
