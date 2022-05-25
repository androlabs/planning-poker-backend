import { User } from '@domain/models';

export interface GenerateTokenUseCase {
  perform(email: string): Promise<string>;
}

export interface GetUserFromTokenUseCase {
  perform(token: string): Promise<User>;
}

export interface BasicAuthLoginUseCase {
  perform(basic: string): Promise<string>;
}
