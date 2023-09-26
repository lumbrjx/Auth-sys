import { FastifyInstance } from "fastify";
import fastifyRedis from "@fastify/redis";

export default function configureRedis(fastify: FastifyInstance) {
  fastify.register(fastifyRedis, { host: "localhost", port: 6379 });
}
