import { Session } from '@domain/models';
import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export const sessionSchema = new Schema<Session>({
  id: { type: 'string', required: true, default: uuid() },
  name: { type: 'string', required: true },
});
