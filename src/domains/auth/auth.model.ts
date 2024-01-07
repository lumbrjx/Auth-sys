import { z } from "zod";
export interface LoginRequestBody {
  username: string;
  password: string;
}
export const bodyJsonSchema = {
  type: "object",
  required: ["username", "password"],
  properties: {
    username: { type: "string" },
    password: { type: "string" },
  },
};
export const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});
export const ResetSchema = z.object({
  email: z.string(),
});
export const tfacodeSchema = z.object({
  code: z.string().max(6),
});
export const ResetTokenSchema = z.object({
  password: z.string(),
});
export const RegisterSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
});
export const RegisterOauthSchema = z.object({
  name: z.string().optional(),
  id: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  email: z.string(),
});
export interface userType {
  id?: string;
  username: string | null;
  password: string | null;
  oauthToken: string | null;
  email: string | null;
  type: string | null;
  TWO_FA: boolean | null;
  twoFaEmail: string | null;
}
export interface RegisterOAuthType {
  username: string;
  oauthToken: string;
  email: string;
}
export interface tfaType {
  usertfaEmail: string | null;
  tfa: boolean | null;
}
export interface RegisterData extends z.infer<typeof RegisterSchema> {}
export interface LoginData extends z.infer<typeof LoginSchema> {}
export interface ResetData extends z.infer<typeof ResetSchema> {}
export interface ResetTokenData extends z.infer<typeof ResetTokenSchema> {}
export interface tfacodeData extends z.infer<typeof tfacodeSchema> {}
export interface RegisterOauthData
  extends z.infer<typeof RegisterOauthSchema> {}
