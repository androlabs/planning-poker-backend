import { makeTeamCreateController } from '@application/controllers/team';
import { createTeamValidator } from '@application/validators';
import { Http, ResourceMapper } from '@main/interfaces';

const routesTeams: ResourceMapper[] = [
  {
    endPoint: '/team',
    method: Http.Methods.post,
    controller: makeTeamCreateController(),
    validators: [createTeamValidator],
  },
];

export { routesTeams };
