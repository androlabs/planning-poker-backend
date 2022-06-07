import { Repository, RepositoryContract } from '@domain/contracts';
import { TeamInvite } from '@domain/models';
import { MongodbAdapter } from '@infra/adapters';
import { teamInviteSchema } from '@infra/mongodb/schemas';

export class TeamInviteRepository implements RepositoryContract<TeamInvite> {
  public static tableName = 'team-invites';
  private readonly databaseAdapter: MongodbAdapter<TeamInvite>;

  constructor(databaseAdapter: MongodbAdapter<TeamInvite>) {
    this.databaseAdapter = databaseAdapter;
  }

  async create(data: TeamInvite): Promise<TeamInvite> {
    const { team_id, expires, who_invite, secret_invite } =
      await this.databaseAdapter.create(data);
    return { team_id, expires, who_invite, secret_invite };
  }

  async get(params: Repository.ParamsGet): Promise<TeamInvite> {
    const teamInvite = await this.databaseAdapter.get(params);

    if (!teamInvite?.secret_invite) throw new Error('Invite not found');

    return {
      team_id: teamInvite.team_id,
      expires: teamInvite.expires,
      who_invite: teamInvite.who_invite,
      secret_invite: teamInvite.secret_invite,
    };
  }
}

/* istanbul ignore next */
export const makeTeamInviteRepository = (): TeamInviteRepository => {
  const mongoDbAdapter = new MongodbAdapter<TeamInvite>(
    teamInviteSchema,
    TeamInviteRepository.tableName,
  );
  return new TeamInviteRepository(mongoDbAdapter);
};
