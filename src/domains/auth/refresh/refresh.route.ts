import { FastifyInstance } from "fastify";
import { refreshController } from "./refresh.controller";
import { endpoints } from "../../../config/default.config";
export default async function (app: FastifyInstance) {
  app.put(endpoints.refreshsession, refreshController);
}
