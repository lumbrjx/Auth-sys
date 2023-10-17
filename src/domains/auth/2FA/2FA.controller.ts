import { ZodError } from "zod";
import { ResetSchema, ResetTokenSchema } from "../auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { editPassword, getUser } from "../auth.services";
import { createId } from "@paralleldrive/cuid2";
import redis from "../../../config/redis-client";

export async function TFAController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const parsedBody = ResetSchema.parse(req.body);
    const user = await getUser(parsedBody.email);
    if (user.data === null) {
      reply.send("A reset link is sent to your email adress.");
    }
    if (user.data?.type === "OAUTH2") {
      reply.code(401).send("An Error occured please try again");
    }
    const userToken = createId();

    await redis.set(userToken, parsedBody.email);
    await redis.expire(userToken, 180);
    reply
      .code(201)
      .send({ fakeEmail: "http://localhost:8080/reset/" + userToken });
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
