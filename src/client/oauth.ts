import dotenv from "dotenv";
dotenv.config();

const oauthPlugin = require("@fastify/oauth2");
async function configureOAuth2(fastify: any) {
  fastify.register(oauthPlugin, {
    name: "googleOAuth2",
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID as string,
        secret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      auth: oauthPlugin.GOOGLE_CONFIGURATION,
    },
    scope: ["openid", "profile", "email"],
    // register a fastify url to start the redirect flow
    startRedirectPath: "/login/google",
    // redirect here after the user login
    callbackUri: "http://localhost:8080/api/auth/callback/google",
  });
}
export default configureOAuth2;
