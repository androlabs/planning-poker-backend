import { secretTeamInvitesService } from '@application/services/crypto';
import { TeamInvite } from '@domain/models';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

export const makeTeamInvite = (teamInvite?: {
  team_id?: string;
  who_invite?: string;
  expires?: number;
}): TeamInvite => {
  const data = {
    team_id: teamInvite?.team_id ?? faker.datatype.uuid(),
    expires:
      teamInvite?.expires ?? dayjs().add(30, 'minutes').toDate().getTime(),
    who_invite: teamInvite?.who_invite ?? faker.datatype.uuid(),
  };
  return {
    ...data,
    secret_invite: secretTeamInvitesService.perform({
      expires: data.expires,
      teamId: data.team_id,
      whoInvite: data.who_invite,
    }),
  };
};

export const makeTeamInvites = (count = 10): TeamInvite[] => {
  return Array(count)
    .fill('')
    .map(() => makeTeamInvite());
};
