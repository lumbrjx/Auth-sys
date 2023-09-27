// auth.js
import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import prisma from "../../../client/prisma-client";

export default async function (fastify: any) {
  // Define a route for Google OAuth2 callback
  fastify.get(
    "/api/auth/callback/google",

    async function (req: FastifyRequest, res: FastifyReply) {
      // Fastify instance gets decorated with this method on OAuth plugin initialization
      const token =
        await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
      //get the user info from google
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      const user = await userInfoResponse.data;
      // Store user data or create a new user in your database using Prisma
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });
      if (!existingUser) {
        await prisma.user.create({
          data: {
            username: user.name,
            email: user.email as string,
            password: user.id,
          },
        });
      }

      // save the session in redis
      const { redis } = fastify;
      await redis.set(
        req.session.sessionId,

        JSON.stringify({ ...user, sessionId: req.session.sessionId })
      );
      await redis.expire(req.session.sessionId, 180);
      //redirect the user to a protected route
      res.redirect("http://localhost:8080/");
    }
  );

  fastify.get("/getAllRecords", async (request: any, reply: any) => {
    try {
      const keys = await fastify.redis.keys("*"); // Get all keys
      const values = await fastify.redis.mget(...keys); // Get values for all keys

      const records = keys.reduce((result: any, key: any, index: any) => {
        result[key] = values[index];
        return result;
      }, {});
      reply.send(records);
      return records;
    } catch (err) {
      console.error(err);
      reply.status(500).send("Error fetching records from Redis");
    }
  });
  fastify.get("/logout", async (req: FastifyRequest, res: FastifyReply) => {
    await req.server.redis.del(req.session.sessionId);
    req.session.destroy();
    res.clearCookie("sessionId");
    res.send("logged out");
  });
}
