import { FastifyInstance } from "fastify";
import { resetController, resetTokenController } from "./reset.controller";
import * as confdata from "../../../config/default.json";

export default async function(app: FastifyInstance) {
  app.post(confdata.reset, resetController);
  app.put(confdata.resetDyn, resetTokenController);
}
