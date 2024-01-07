import { ZodError } from "zod";
import { ResetSchema, ResetTokenSchema } from "../auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { editPassword, getUser } from "../auth.services";
import { createId } from "@paralleldrive/cuid2";
import redis from "../../../config/redis-client";
import bcrypt from "bcrypt";
import { redisConf } from "../../../config/default.config";
import { csts } from "../../../config/consts";
// Reset
export async function resetController(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const parsedBody = ResetSchema.parse(req.body);
    const user = await getUser(parsedBody.email, false);
    if (user.data === null) {
      return reply.send({
        ok: true,
        message: "A reset link is sent to your email address.",
      });
    }
    if (user.data?.type === csts.OAUTH) {
      return reply
        .status(401)
        .send({ ok: false, message: "An Error occured please try again" });
    }
    const userToken = createId();
    await redis.set(userToken, parsedBody.email);
    await redis.expire(userToken, redisConf.resetTokenExp);
    reply.code(201).send({ ok: true, fakeEmail: csts.RESET_LINK + userToken });
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
  reply: FastifyReply
) {
  try {
    const parsedBody = ResetTokenSchema.parse(req.body);
    const { tokenId } = (await req.params) as any;
    if (!tokenId) {
      return reply.status(400).send({
        ok: false,
        message: "Error reseting your password please try again",
      });
    }
    const token_email = await redis.get(tokenId);
    if (token_email === null) {
      return reply.status(401).send({
        ok: false,
        message: "unauthorized",
      });
    }
    const editedpass = await bcrypt.hash(parsedBody.password, 10);
    const edited = await editPassword(editedpass, token_email as string);
    if (edited.success === false) {
      reply.status(500).send({ ok: false, error: "Internal Server Error" });
    }
    if (edited.success === true) {
      await redis.del(tokenId);
    }
    reply.code(201).send({ ok: true, edited: edited });
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}

// OAUTH2 , link
