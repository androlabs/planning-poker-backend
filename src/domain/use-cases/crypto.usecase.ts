export interface BcryptUseCase {
  hash(content: string): Promise<string>;
  compare(plainText: string, hash: string): Promise<boolean>;
}

export interface CryptTeamInvitesUseCase {
  encrypt(content: string): string;
  compare(content: string, hash: string): boolean;
}
