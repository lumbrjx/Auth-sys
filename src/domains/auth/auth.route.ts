import { FastifyInstance } from "fastify";
import { loginController, reigsterController } from "./auth.controller";

export default async function (app: FastifyInstance) {
  app.post("/login", loginController);
  app.post("/register", reigsterController);
}
