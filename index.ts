import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { Logger } from "@sync-markets/utilities";
import orderRouter from "./src/routes/order";
import userRouter from "./src/routes/user";
import positionRouter from "./src/routes/position";
import tradeRouter from "./src/routes/trade";
import Knex from "knex";
import { Model } from "objection";
import knexConfig from "./configs/knexfile";
import applySecurityHeaders from "./src/middlewares/headers";
import enforcePayloadSizeLimit from "./src/middlewares/payloadsize";
import applyTimeout from "./src/middlewares/timeout";
import applyWhitelist from "./src/middlewares/whitelist";

const app = express();
const knex = Knex(
  process.env.NODE_ENV == "development"
    ? knexConfig.development
    : knexConfig.production
);

const logger = new Logger();

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:5000"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
};

if (process.env.NODE_ENV === "development") dotenv.config({ path: "./.env" });

app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(helmet());
app.use(
  morgan(
    ':remote-addr :remote-user ":method :url HTTP/:http-version" :referrer ":user-agent" :status :response-time ms',
    {
      stream: { write: (message) => logger.error(`${message.trim()}`) },
      skip: (req: Request, res: Response) => {
        return res.statusCode < 400;
      },
    }
  )
);
app.use(
  morgan(
    ':remote-addr :remote-user ":method :url HTTP/:http-version" :referrer ":user-agent" :status :response-time ms',
    {
      stream: { write: (message) => logger.info(`${message.trim()}`) },
      skip: (req: Request, res: Response) => {
        return res.statusCode >= 400;
      },
    }
  )
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(applySecurityHeaders);
app.use(enforcePayloadSizeLimit);
app.use(applyTimeout);
app.use(applyWhitelist);

// Routes
app.use("/api/orders", orderRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/positions", positionRouter);
app.use("/api/v1/trades", tradeRouter);

app.use("/api/health", (req, res) => {
  return res.sendStatus(200);
});

app.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

const server = app.listen(
  Number(process.env.PORT) || 8080,
  process.env.IP || "0.0.0.0",
  async () => {
    logger.info(`Starting at ${process.env.IP}:${process.env.PORT}`);

    if (process.env.NODE_ENV === "development")
      logger.info("====== WORKING IN DEVELOPMENT MODE ======");
    else logger.info("====== WORKING IN PRODUCTION MODE ======");

    app.set("logger", logger);
    app.set("knex", knex);
    Model.knex(knex);
  }
);

server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;

let shuttingDown = false;

// Closing resources when main thread is closed
async function handleShutdown() {
  if (shuttingDown) return;
  shuttingDown = true;

  try {
    await knex.destroy();
    logger.info("====== RESOURCES CLOSED ======");
    process.exit(0);
  } catch (error) {
    logger.error(`Error during shutdown: ${error}`);
    process.exit(1);
  }
}

process.on("SIGINT", () => handleShutdown());
process.on("SIGTERM", () => handleShutdown());
process.on("SIGHUP", () => handleShutdown());

process.on("uncaughtException", (err) => {
  logger.error(`[Error: uncaughtException] - ${err}`);
});
process.on("unhandledRejection", (reason, promise) => {
  logger.error(
    `[Error: unhandledRejection] - Promise: ${JSON.stringify(
      promise
    )}\nReason: ${reason}`
  );
});
