import { model, Schema } from 'mongoose';

export class MongodbAdapter<T> {
  // TODO implement connection database
  private schema: Schema<T>;
  private tableName: string;

  constructor(schema: Schema<T>, tableName: string) {
    this.schema = schema;
    this.tableName = tableName;
  }

  async create(data: T): Promise<T> {
    const Document = model<T>(this.tableName, this.schema);
    const document = new Document(data);
    await document.save();

    return document;
  }
}
