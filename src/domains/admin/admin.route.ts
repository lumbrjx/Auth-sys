import { FastifyInstance } from "fastify";
import checkAuthentication from "../../middlewares/checkAuthentication";
import { adminController } from "./admin.controller";
import * as confdata from "../../config/default.json";
export default async function (app: FastifyInstance) {
  app.get(
    confdata.dashboard,
    { preHandler: checkAuthentication },
    adminController
  );
}
