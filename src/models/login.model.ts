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
export const MySchema = z.object({
  username: z.string(),
  password: z.string(),
});
