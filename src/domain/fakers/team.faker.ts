import { Team } from '@domain/models';
import { faker } from '@faker-js/faker';

export const makeTeam = (team?: { id?: string; name?: string }): Team => {
  return {
    id: team?.id ?? faker.datatype.uuid(),
    name: team?.name ?? faker.commerce.department(),
  };
};

export const makeTeams = (count = 10): Team[] => {
  return Array(count)
    .fill('')
    .map(() => makeTeam());
};
