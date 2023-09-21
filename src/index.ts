import fastify from "fastify";

const server = fastify({
  logger: true,
});

server.register(import("./routes/login"));
server.register(import("./routes/register"));
server.get("/", async (request, reply) => {
  reply.send("a simple auth system made by clog");
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
