import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import express, { NextFunction, Request, Response } from "express";
import next from "next";
import { parse } from "url";
import session from "express-session";
import redis from "./redis";
import connectRedis, { RedisStore } from "connect-redis";
import {
  ONE_DAY_MS,
  IS_PRODUCTION,
  SESSION_NAME,
  SESSION_SECRET_STRING,
  PROD_ENDPOINT,
  DEV_ENDPOINT,
} from "../config/constants";
import { genSchema } from "./utils/genSchema";
import sequelize from "./models/index";
import { associateModels } from "./utils/associateModels";
import * as Sentry from "@sentry/node";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

const port = process.env.PORT || 4000;
const nextApp = next({ dev: !IS_PRODUCTION });
const handle = nextApp.getRequestHandler();

(async function startServer() {
  try {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
    });
    associateModels();
    await sequelize.sync();
    const RedisStore: RedisStore = connectRedis(session);
    const server = new ApolloServer({
      schema: genSchema(),
      context: ({ req }) => ({ session: req.session }),
    });
    await nextApp.prepare();
    const app = express();
    app.use(helmet());
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10000,
    });
    app.use(limiter);
    app.set("trust proxy", 1);
    app.use(
      session({
        store: new RedisStore({ client: redis }),
        name: SESSION_NAME,
        secret: SESSION_SECRET_STRING,
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: true,
          secure: IS_PRODUCTION,
          maxAge: ONE_DAY_MS,
        },
      })
    );
    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: IS_PRODUCTION ? PROD_ENDPOINT : DEV_ENDPOINT,
      },
    });
    app.all("*", (req: Request, res: Response, next: NextFunction) => {
      const parsedUrl = parse(req.url, true);
      return handle(req, res, parsedUrl);
    });
    app.listen({ port }, () => {
      console.log(`Server ready at ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
