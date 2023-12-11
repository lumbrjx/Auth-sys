import { ZodError } from "zod";
import { ResetSchema, ResetTokenSchema } from "../auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { editPassword, getUser } from "../auth.services";
import { createId } from "@paralleldrive/cuid2";
import redis from "../../../config/redis-client";
import * as confdata from "../../../config/default.json";
import bcrypt from "bcrypt";
import { AUTH_TYPES } from "../../../constants";

// Reset
export async function resetController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const parsedBody = ResetSchema.parse(req.body);
    const user = await getUser(parsedBody.email);
    if (user.data === null) {
      reply.send("A reset link is sent to your email adress.");
    }
    if (user.data?.type === AUTH_TYPES.OAUTH2) {
      reply.code(401).send("An Error occured please try again");
    }
    const userToken = createId();
    await redis.set(userToken, parsedBody.email);
    await redis.expire(userToken, confdata.redisConf.resetTokenExp);
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
// Post reset link generation
export async function resetTokenController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const parsedBody = ResetTokenSchema.parse(req.body);
    const { tokenId } = (await req.params) as any;
    if (!tokenId) {
      reply.code(400).send("Error reseting your password please try again");
    }
    const token_email = await redis.get(tokenId);
    if (token_email === null) {
      reply.code(401).send("unauthorized");
    }
    const editedpass = await bcrypt.hash(parsedBody.password, 10);
    const edited = await editPassword(editedpass, token_email as string);
    if (edited.success === false) {
      reply.status(500).send({ error: "Internal Server Error" });
    }
    if (edited.success === true) {
      await redis.del(tokenId);
    }
    reply.code(201).send({ edited: edited });
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
