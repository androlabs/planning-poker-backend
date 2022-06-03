import { TeamUser } from '@domain/models';
import { Schema } from 'mongoose';

export const teamUserSchema = new Schema<TeamUser>({
  team_id: { type: 'string', required: true },
  user_id: { type: 'string', required: true },
  is_owner: { type: 'boolean', required: true },
});
