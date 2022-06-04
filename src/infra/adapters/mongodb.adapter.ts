import { Repository } from '@domain/contracts';
import { env } from '@main/config/env';
import { connect, disconnect, Model, model, Schema } from 'mongoose';

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
  }

  private async closeConnection(): Promise<void> {
    await disconnect();
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

  async get(params: Repository.ParamsGet): Promise<T> {
    await this.openConnect();

    const Document = this.getInstance();
    const document = await Document.findOne(params.filter, params.fields);

    await this.closeConnection();

    return document as T;
  }

  async list(params: Repository.ParamsList): Promise<T[]> {
    await this.openConnect();

    const Document = this.getInstance();
    const documents = await Document.find(params.filter, params.fields, {
      ...params.paginate,
    });

    await this.closeConnection();

    return documents;
  }

  // TODO Implement count
}
