import { LoggerContract } from '@domain/contracts';
import winston from 'winston';

const loggerPrint = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.printf((info: winston.Logform.TransformableInfo) => {
          return `[${info.level}] :${info.message}`;
        }),
      ),
    }),
  ],
});

export class Logger implements LoggerContract {
  info(message: string): void {
    loggerPrint.info(message);
  }
  error(message: string, stack: unknown): void {
    loggerPrint.error(message, stack);
  }
}

export const logger = new Logger();
