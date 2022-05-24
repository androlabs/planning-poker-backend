import { User } from '@domain/models';

export interface GenerateToken {
  perform(params: { email: string }): Promise<string>;
}

export interface GetUserFromToken {
  perform(token: string): Promise<User>;
}

export interface BasicAuthLogin {
  perform(basic: string): Promise<string>;
}
