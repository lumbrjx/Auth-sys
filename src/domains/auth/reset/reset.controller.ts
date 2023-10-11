import { ZodError } from "zod";
import { ResetSchema } from "../auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { getUser } from "../auth.services";
// import redis from "../../config/redis-client";
import { createId } from "@paralleldrive/cuid2";

export async function resetController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const parsedBody = ResetSchema.parse(req.body);
    const user = await getUser(parsedBody.email);
    if (user.data === null) {
      reply.send("A reset link is sent to your email adress.");
    }
    if (user.data?.type === "OAUTH2") {
      reply.code(401).send("An Error occured please try again");
    }

    console.log(user);
    reply.code(201).send({ message: user });
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
