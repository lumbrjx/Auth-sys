import { FastifyInstance } from "fastify";
import checkAuthentication from "../../middlewares/checkAuthentication";
import { adminController } from "./admin.controller";

export default async function(app: FastifyInstance) {
  app.get("/dashboard", { preHandler: checkAuthentication }, adminController);
}
