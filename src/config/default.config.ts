import { environments } from "./environment.config";
export const endpoints = {
  oauth_start_redirect_path: "/login/google",
  oauth_callback_Uri: `${environments.apiUrl}/api/auth/callback/google`,
  homeUrl: `${environments.apiUrl}`,
  home: "/",
  login: "/login",
  register: "/register",
  reset: "/reset",
  resetDyn: "/reset/:tokenId",
  tfa: "/2fa",
  disable2fa: "/2fa/disable",
  googleCallback: "/api/auth/callback/google",
  logout: "/logout",
  tfaLoginDyn: "/login/2fa/:user",
  tfaLogin: "/login/2fa/",
  dashboard: "/dashboard",
  refreshsession: "/refresh",
};
export const cookiesConf = {
  cookiename: "my-session-cookie",
  sessionName: "session",
  maxage: 120000,
};
export const redisConf = {
  sessionExp: 180,
  resetTokenExp: 180,
  tfaTokenExp: 180,
};
