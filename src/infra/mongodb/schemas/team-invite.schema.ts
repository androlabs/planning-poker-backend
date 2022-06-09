import { TeamInvite } from '@domain/models';
import { Schema } from 'mongoose';

export const teamInviteSchema = new Schema<TeamInvite>({
  team_id: { type: 'string', required: true },
  who_invite: { type: 'string', required: true },
  expires: { type: 'number', required: true },
  secret_invite: {
    type: 'string',
    required: true,
    index: 'hashed',
    unique: true,
  },
});
