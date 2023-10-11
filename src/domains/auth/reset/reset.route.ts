import { FastifyInstance } from "fastify";
import { resetController } from "./reset.controller";

export default async function (app: FastifyInstance) {
  app.post("/reset", resetController);
}
