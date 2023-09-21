import { FastifyInstance } from "fastify";
import loginController from "../controllers/login.controller";
import { bodyJsonSchema } from "../models/login.model";

const schema = {
  body: bodyJsonSchema,
  ajv: {
    coerceTypes: false,
  },
};
export default async function (app: FastifyInstance) {
  app.post("/login", loginController);
}
