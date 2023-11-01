import { FastifyInstance } from "fastify";
import {
  loginController,
  reigsterController,
  tfagenController,
} from "./auth.controller";

export default async function (app: FastifyInstance) {
  app.post("/login", loginController);
  app.post("/register", reigsterController);
  app.post("/login/2fa/:user", tfagenController);
}
