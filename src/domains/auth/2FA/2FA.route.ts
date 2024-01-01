import { FastifyInstance } from "fastify";
import { TFAController, TFAControllerDisable } from "./2FA.controller";
import checkAuthentication from "../../../middlewares/checkAuthentication";
import { endpoints } from "../../../config/default.config";
export default async function (app: FastifyInstance) {
  app.put(endpoints.tfa, { preHandler: checkAuthentication }, TFAController);
  app.put(
    endpoints.disable2fa,
    { preHandler: checkAuthentication },
    TFAControllerDisable
  );
}
