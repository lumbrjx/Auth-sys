// auth.js
import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";
import { csts } from "../../../config/consts";
import redis from "../../../config/redis-client";
import { endpoints, cookiesConf } from "../../../config/default.config";
import { createOAuthUser, getUser } from "../auth.services";
import { createRedisSession } from "../../../lib/auth-utils/redis-session";
export default async function (fastify: any) {
  // Define a route for Google OAuth2 callback
  fastify.get(
    endpoints.googleCallback,
    async function (req: FastifyRequest, res: FastifyReply) {
      // Fastify instance gets decorated with this method on OAuth plugin initialization
      const token =
        await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);
      //get the user info from google
      const userInfoResponse = await axios.get(
        process.env.OAUTH_USERINFO_URL as string,
        { headers: { Authorization: `Bearer ${token.access_token}` } }
      );
      const user = await userInfoResponse.data;
      const existingUser = await getUser(user.email, false);
      if (!existingUser.success) {
        await createOAuthUser({
          username: user.name,
          email: user.email as string,
          oauthToken: user.id,
        });
      }
      // save session in redis
      await createRedisSession(req, user);
      //redirect the user to a protected route
      res.redirect(endpoints.homeUrl);
    }
  );
  // dev function
  fastify.get("/getAllRecords", async (request: any, reply: any) => {
    try {
      const keys = await redis.keys("*"); // Get all keys
      const values = await redis.mget(...keys); // Get values for all keys
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
  fastify.get(endpoints.logout, async (req: any, res: FastifyReply) => {
    await redis.del(req.session.get(csts.COOKIE));
    req.session.delete();
    res.clearCookie(cookiesConf.cookiename);
    res.status(200).send({ ok: true, message: "logged out" });
  });
}

// OAUTH2
