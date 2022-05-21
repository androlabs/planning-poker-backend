import { Team } from '@domain/models';
import { Schema } from 'mongoose';
import { v4 as uuid } from 'uuid';

export const teamSchema = new Schema<Team>({
  id: {
    type: 'string',
    required: true,
    default: () => uuid(),
    index: 'hashed',
  },
  name: { type: 'string', required: true },
});
