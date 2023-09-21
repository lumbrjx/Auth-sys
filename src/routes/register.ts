import { FastifyInstance } from "fastify";
import registerController from "../controllers/register.controller";

export default async function (app: FastifyInstance) {
  app.post("/register", registerController);
}
