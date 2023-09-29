import fastify from "fastify";
import configureSession from "./config/session";
import configureOAuth2 from "./config/oauth";
import configureRedis from "./config/redis-client";
import dotenv from "dotenv";
dotenv.config();
const server = fastify({
  logger: false,
});

configureRedis(server); // redis client
configureOAuth2(server); // oauth provider
configureSession(server); // session config
server.register(import("./domains/auth/auth.route")); // credentials auth routes
server.register(import("./domains/auth/oauth/oauth.route")); // oauth routes
server.register(import("./domains/admin/admin.route")); // protected route

server.get("/", async (request, reply) => {
  reply.send(request.url);
});

const PORT = parseInt(process.env.PORT ?? "") || 8080;

server.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
