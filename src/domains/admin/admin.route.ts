import { FastifyInstance } from "fastify";
import checkAuthentication from "../../middlewares/checkAuthentication";
import { adminController } from "./admin.controller";
import { endpoints } from "../../config/default.config";
export default async function (app: FastifyInstance) {
  app.get(
    endpoints.dashboard,
    { preHandler: checkAuthentication },
    adminController
  );
}
