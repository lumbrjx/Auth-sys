import { FastifyInstance } from "fastify";
interface LoginRequestBody {
  username: string;
  password: string;
  email: string;
  preference: string;
}
export default async function (app: FastifyInstance) {
  app.post("/register", async function (req, reply) {
    const { username, password, email, preference } =
      (await req.body) as LoginRequestBody;
    reply
      .code(201)
      .send({
        username: username,
        password: password,
        email: email,
        preference: preference,
      });
  });
}
