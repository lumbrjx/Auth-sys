// auth.js
import { FastifyReply, FastifyRequest } from "fastify";
import axios from "axios";

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
      const user = userInfoResponse.data;
      // save the session in redis
      const { redis } = fastify;
      await redis.set(
        req.session.sessionId,
        JSON.stringify({ ...user, sessionId: req.session.sessionId })
      );
      //redirect the user to a protected route
      res.redirect("http://localhost:8080/");
    }
  );

  // Define a protected route that requires authentication
  // fastify.get('/dashboard', (request :FastifyRequest, reply :FastifyReply) => {
  //   try {
  //     const { redis } = fastify
  //   redis.get(request.session.sessionId , (err :any , val:any )=>{
  //     const redis_session = JSON.parse(val)
  //     // const {sessionId} =
  //     if (redis_session.sessionId === request.session.sessionId){

  //       reply.send(`Welcome, ${request.session.sessionId}!`);
  //     }
  //     reply.status(403).send("invalid session")
  //       // Display the user dashboard
  //   })
  //   }catch {
  //     reply.redirect("http://localhost:8080/login/oauth");
  //   }

  // });
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
}
