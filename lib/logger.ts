import { ENV } from "@/constants";
import { existsSync, mkdirSync } from "fs";
import {
  createLogger,
  format,
  type transport,
  type Logger,
  type LogEntry,
  transports,
} from "winston";

const logDir = ENV.LOG_DIR;
if (!existsSync(logDir)) mkdirSync(logDir);

const logTransports: transport[] = [new transports.Console()];
const fileTransports: transport[] = [
  new transports.File({
    filename: `${logDir}/error.log`,
    level: "error",
  }),
  new transports.File({ filename: `${logDir}/app.log` }),
];

export const logger: Logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: logTransports.concat(fileTransports),
});

export const logWithoutConsole = (logEntry: LogEntry) => {
  const consoleTransport = logger.transports.find(
    (transport) => transport instanceof transports.Console
  );
  const fileTransport = logger.transports.find(
    (transport) => transport instanceof transports.File
  );

  if (!fileTransport) {
    fileTransports.forEach((transport) => logger.add(transport));
  }

  if (!consoleTransport) {
    logger.log(logEntry);
    return;
  }

  logger.remove(consoleTransport);
  logger.log(logEntry);
  logger.add(consoleTransport);
};
