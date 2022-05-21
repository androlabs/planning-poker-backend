import {
  makeCreateTeamController,
  makeGetTeamController,
} from '@application/controllers/team';
import { createTeamValidator, getTeamValidator } from '@application/validators';
import { Http, ResourceMapper } from '@main/interfaces';

const routesTeams: ResourceMapper[] = [
  {
    endPoint: '/team',
    method: Http.Methods.post,
    controller: makeCreateTeamController(),
    validators: [createTeamValidator],
  },
  {
    endPoint: '/team/:team_id',
    method: Http.Methods.get,
    controller: makeGetTeamController(),
    validators: [getTeamValidator],
  },
];

export { routesTeams };
