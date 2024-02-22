// pino logger singleton
import pino from "pino";

const logLevel = process.env['PINO_LOG_LEVEL'] || "warn"
const logFile = process.env['PINO_LOG_FILE'] || undefined

export const logger = pino.pino({

    name: 'node-api',
    level: logLevel

});

// export const logger = pino.pino(pino.destination({
//     dest: logFile, // omit for stdout
// }))
