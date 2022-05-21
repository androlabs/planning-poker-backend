import { env } from '@main/config/env';
import { logger } from '@main/config/logger';
import { connect, disconnect, model, Schema } from 'mongoose';

export class MongodbAdapter<T> {
  private schema: Schema<T>;
  private tableName: string;

  constructor(schema: Schema<T>, tableName: string) {
    this.schema = schema;
    this.tableName = tableName;
  }

  private async openConnect(): Promise<void> {
    const { host, password, user } = env.database;
    await connect(`mongodb://${user}:${password}@${host}:27017`, {
      dbName: 'planning-poker',
    });
    logger.info('Connection MongoDB opened');
  }

  private async closeConnection(): Promise<void> {
    await disconnect();
    logger.info('Connection MongoDB closed');
  }

  async create(data: T): Promise<T> {
    await this.openConnect();

    const Document = model<T>(this.tableName, this.schema);
    const document = new Document(data);
    await document.save();

    await this.closeConnection();

    return document;
  }
}
