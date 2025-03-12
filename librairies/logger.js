
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
    let result = `${timestamp} ${level}: ${message}`;
    if (stack) result += `\n${stack}`;
    return result;
});

const logger = createLogger({
    level: 'info',
    // defaultMeta: { service: 'inventory-service' },
    format: combine(
        format.errors({ stack: true }),
        timestamp(),
        myFormat
    ),
    transports: [
        //
        // - Write all logs with importance level of `error` or less to `error.log`
        // - Write all logs with importance level of `info` or less to `combined.log`
        //
        new transports.File({ filename: 'error.log', level: 'warn' }),
        new transports.File({ filename: 'combined.log' }),
    ],
});

logger.add(new transports.Console());

export default logger;