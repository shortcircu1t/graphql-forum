import Redis from "ioredis";
import url from "url";

const redisClient = (function setupRedis() {
  let redisClient;
  if (process.env.REDISTOGO_URL) {
    const rtg = url.parse(process.env.REDISTOGO_URL);
    redisClient = new Redis({
      port: +rtg.port!,
      host: rtg.hostname!.toString(),
      password: rtg.auth!.split(":")[1],
    });
  } else {
    redisClient = new Redis();
  }
  return redisClient;
})();

export default redisClient;
