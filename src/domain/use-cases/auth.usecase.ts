import { User } from '@domain/models';

export interface TokenUseCase {
  generate(email: string): Promise<string>;
  decode(token: string): Promise<Record<any, any>>;
  verify(token: string): Promise<boolean>;
}

export interface BasicAuthLoginUseCase {
  perform(basic: string): Promise<User>;
}
