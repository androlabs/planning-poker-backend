import { TeamUser } from '@domain/models';
import { faker } from '@faker-js/faker';

export const makeTeamUser = (teamUser?: {
  team_id?: string;
  user_id?: string;
  is_owner?: boolean;
}): TeamUser => {
  return {
    team_id: teamUser?.team_id ?? faker.datatype.uuid(),
    user_id: teamUser?.user_id ?? faker.datatype.uuid(),
    is_owner: teamUser?.is_owner ?? faker.datatype.boolean(),
  };
};

export const makeTeamUsers = (count = 10): TeamUser[] => {
  return Array(count)
    .fill('')
    .map(() => makeTeamUser());
};
