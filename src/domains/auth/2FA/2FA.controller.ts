import { ZodError } from "zod";
import { ResetSchema } from "../auth.model";
import { FastifyRequest, FastifyReply } from "fastify";
import { edit2fa, getUser } from "../auth.services";
import redis from "../../../config/redis-client";
import { csts } from "config/consts";
// 2FA enable
export async function TFAController(req: FastifyRequest, reply: FastifyReply) {
  try {
    const parsedBody = ResetSchema.parse(req.body);
    const session = await redis.get(req.session.get(csts.COOKIE));
    const parsedSession = await JSON.parse(session as string);
    const user = await getUser(parsedSession.email);
    if (user.data === null) {
      return reply.send("A 2FA code is sent to your email adress.");
    }
    if (user.data?.type === csts.OAUTH) {
      return reply.code(401).send("An Error occured please try again");
    }
    await edit2fa(user.data?.email as string, parsedBody.email, true);
    reply.code(200).send("2FA enabeled");
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}
// 2FA disable
export async function TFAControllerDisable(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const session = await redis.get(req.session.get(csts.COOKIE));
    const parsedSession = await JSON.parse(session as string);
    const user = await getUser(parsedSession.email);
    if (user.data === null) {
      return reply.send("A 2FA code is sent to your email adress.");
    }
    if (user.data?.type === csts.OAUTH) {
      return reply.code(401).send("An Error occured please try again");
    }
    await edit2fa(user.data?.email as string, null, false);
    reply.code(200).send("2FA disabled");
  } catch (error: any) {
    if (error instanceof ZodError) {
      reply.status(400).send({ error: error.issues[0].message });
    } else {
      reply.status(500).send({ error: "Internal Server Error" });
    }
  }
}

// OAUTH2 , cookie
