import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST as string, // service name
  port: process.env.REDIS_PORT as unknown as number, //  port
});

export default redis;
