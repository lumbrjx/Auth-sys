import fastify from "fastify";
import configureSession from "./client/session";
import configureOAuth2 from "./client/oauth";
import configureRedis from "./client/redis-client";

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

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
