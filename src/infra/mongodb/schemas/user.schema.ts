import { User } from '@domain/models';
import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export const userSchema = new Schema<User>({
  id: {
    type: 'string',
    required: true,
    default: () => uuid(),
    index: 'hashed',
  },
  name: { type: 'string', required: true },
  email: { type: 'string', required: true },
  password: { type: 'string', required: true, select: false },
});
