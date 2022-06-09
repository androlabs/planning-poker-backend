export interface BcryptUseCase {
  hash(content: string): Promise<string>;
  compare(plainText: string, hash: string): Promise<boolean>;
}

export interface CryptTeamInvitesUseCase {
  encrypt(content: string): string;
  compare(content: string, hash: string): boolean;
}

export interface SecretTeamInvitesUseCase {
  perform(params: {
    teamId: string;
    whoInvite: string;
    expires: number;
  }): string;
}
