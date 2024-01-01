import oAuthPlugin from "@fastify/oauth2";
import { endpoints } from "./default.config";
async function configureOAuth2(fastify: any) {
  fastify.register(oAuthPlugin, {
    name: "googleOAuth2",
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID as string,
        secret: process.env.GOOGLE_CLIENT_SECRET as string,
      },
      auth: oAuthPlugin.GOOGLE_CONFIGURATION,
    },
    scope: ["openid", "profile", "email"],
    // register a fastify url to start the redirect flow
    startRedirectPath: endpoints.oauth_start_redirect_path,
    // redirect here after the user login
    callbackUri: endpoints.oauth_callback_Uri,
  });
}
export default configureOAuth2;
