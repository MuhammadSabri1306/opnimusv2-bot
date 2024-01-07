const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const logConfig = require("../../config/log");

module.exports = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
            if(stack)
                return `[${timestamp}] ${level.toUpperCase()}: ${message} - ${stack}`;
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new DailyRotateFile({
            dirname: logConfig.get("baseDir"),
            filename: `${ logConfig.get("botPrefix") }-%DATE%.log`,
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "7d",
        }),
    ],
});