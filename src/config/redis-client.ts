import Redis from "ioredis";

const redis = new Redis({
    host: 'prisma-redis', // Docker Compose service name
    port: 6379,            // Docker Compose port
  });

export default redis;
