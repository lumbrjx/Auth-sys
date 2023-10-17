import { FastifyInstance } from "fastify";
import { TFAController } from "./2FA.controller";

export default async function (app: FastifyInstance) {
  app.put("/2fa", TFAController);
}
