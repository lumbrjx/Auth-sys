import fastifyRedis from "fastify-redis";

declare module "fastify" {
  interface FastifyInstance {
    redis: fastifyRedis.Redis;
  }
}
