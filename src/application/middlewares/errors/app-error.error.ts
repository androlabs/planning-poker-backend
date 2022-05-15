import { logger } from '@main/config/logger';
import { Http } from '@main/interfaces';

export class AppError {
  public readonly message: string;
  public readonly category: string;
  public readonly messages: Record<string, unknown>;
  public readonly status: number;

  constructor({ message, category, messages = {}, status = 400 }: Http.Error) {
    this.message = message;
    this.category = category;
    this.messages = messages;
    this.status = status;

    logger.error('AppError: ', {
      message,
      category,
      messages,
      status,
    });
  }
}
