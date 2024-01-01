import { FastifyInstance } from "fastify";
import {
  loginController,
  reigsterController,
  tfagenController,
} from "./auth.controller";
import { endpoints } from "../../config/default.config";
export default async function (app: FastifyInstance) {
  app.post(endpoints.login, loginController);
  app.post(endpoints.register, reigsterController);
  app.post(endpoints.tfaLoginDyn, tfagenController);
}
