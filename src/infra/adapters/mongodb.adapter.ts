/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@main/config/env';
import { logger } from '@main/config/logger';
import { connect, disconnect, Model, model, Schema } from 'mongoose';

type ParamsList = {
  filter?: any;
  fields?: string[];
  paginate?: {
    skip: number;
    limit: number;
  };
};

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

  private getInstance(): Model<T> {
    return model<T>(this.tableName, this.schema);
  }

  async create(data: T): Promise<T> {
    await this.openConnect();

    const Document = this.getInstance();
    const document = new Document(data);
    await document.save();

    await this.closeConnection();

    return document;
  }

  async get(id: string | number): Promise<T> {
    await this.openConnect();

    const Document = this.getInstance();
    const document = await Document.findOne({ id }).exec();

    await this.closeConnection();

    return document as T;
  }

  async list(params: ParamsList): Promise<T[]> {
    await this.openConnect();

    const Document = this.getInstance();
    const documents = await Document.find(params.filter, params.fields, {
      ...params.paginate,
    });

    return documents;
  }
}
