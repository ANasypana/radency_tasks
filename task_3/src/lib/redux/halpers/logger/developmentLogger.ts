// Core
import winston from 'winston';

export const developmentLogger = winston.createLogger({
  level: 'debug',
  'transports': [
    new winston.transports.Console(),
  ],
  'format': winston.format.combine(
    winston.format.colorize(),
    winston.format.simple(),
  ),
});
