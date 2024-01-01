import { FastifyInstance } from "fastify";
import { resetController, resetTokenController } from "./reset.controller";
import { endpoints } from "../../../config/default.config";
export default async function (app: FastifyInstance) {
  app.post(endpoints.reset, resetController);
  app.put(endpoints.resetDyn, resetTokenController);
}
