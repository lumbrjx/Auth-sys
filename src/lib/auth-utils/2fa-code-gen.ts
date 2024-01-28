// 2FA Code generator
import { csts } from "../../config/consts";
import { redis } from "../../config/redis-client";
import { redisConf } from "../../config/default.config";

interface parsedBodyType {
  password: string;
  email: string;
}
export function generateRandom6DigitNumber(): string {
  const randomNumber = Math.floor(Math.random() * 1000000);
  const sixDigitNumber = randomNumber.toString().padStart(6, "0");
  return sixDigitNumber;
}
export async function generate2FACode(parsedBody: parsedBodyType) {
  const tfaToken = generateRandom6DigitNumber();
  await redis.set(csts.TWO_FACTOR_AUTH + parsedBody.email, tfaToken);
  await redis.expire(
    csts.TWO_FACTOR_AUTH + parsedBody.email,
    redisConf.tfaTokenExp
  );
  return tfaToken;
}
