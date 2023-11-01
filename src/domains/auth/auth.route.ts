import { FastifyInstance } from "fastify";
import {
  loginController,
  reigsterController,
  tfagenController,
} from "./auth.controller";
import * as confdata from "../../config/default.json";
export default async function (app: FastifyInstance) {
  app.post(confdata.login, loginController);
  app.post(confdata.register, reigsterController);
  app.post(confdata.tfaLoginDyn, tfagenController);
}
