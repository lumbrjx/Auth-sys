import { FastifyInstance } from "fastify";
import { resetController, resetTokenController } from "./reset.controller";

export default async function (app: FastifyInstance) {
  app.post("/reset", resetController);
  app.put("/reset/:tokenId", resetTokenController);
}
