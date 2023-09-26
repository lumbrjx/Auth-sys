import fastify from "fastify";
import configureSession from "./client/session";
import configureOAuth2 from "./client/oauth";
import configureRedis from "./client/redis-client";

const server = fastify({
  logger: false,
});

configureRedis(server);
configureOAuth2(server);
configureSession(server);
server.register(import("./domains/auth/auth.route"));
server.register(import("./domains/auth/oauth/oauth.route"));
server.register(import("./domains/admin/admin.route"));

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
