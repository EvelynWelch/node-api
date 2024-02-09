// pino logger singleton
import pino from "pino";

const logLevel = process.env['PINO_LOG_LEVEL'] || "warn"

export const logger = pino.pino({
    name: 'node-api',
    level: logLevel,
});
