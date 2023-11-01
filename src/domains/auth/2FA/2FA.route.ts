import { FastifyInstance } from "fastify";
import { TFAController, TFAControllerDisable } from "./2FA.controller";
import checkAuthentication from "../../../middlewares/checkAuthentication";
import * as confdata from "../../../config/default.json";
export default async function (app: FastifyInstance) {
  app.put(confdata.tfa, { preHandler: checkAuthentication }, TFAController);
  app.put(
    confdata.disable2fa,
    { preHandler: checkAuthentication },
    TFAControllerDisable
  );
}
