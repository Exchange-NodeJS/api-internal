import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { Logger } from "@sync-markets/utilities";

const app = express();
const logger = new Logger();

const corsOptions: cors.CorsOptions = {
  origin: ["http://localhost:4200"],
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
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  }
);

server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;

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
