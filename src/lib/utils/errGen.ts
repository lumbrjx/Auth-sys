import { FastifyError } from "fastify";

// 2FA Code generator
interface ResponseError extends Error {
  status?: number;
}
export function errGen(code: number, message: string) {
  const unauthorizedError: FastifyError = new Error(message);
  unauthorizedError.code = message;
  unauthorizedError.statusCode = code;
  throw unauthorizedError;
}
