import { FastifyInstance } from "fastify";
import { TFAController, TFAControllerDisable } from "./2FA.controller";
import checkAuthentication from "../../../middlewares/checkAuthentication";

export default async function (app: FastifyInstance) {
  app.put("/2fa", { preHandler: checkAuthentication }, TFAController);
  app.put(
    "/2fa/disable",
    { preHandler: checkAuthentication },
    TFAControllerDisable
  );
}
