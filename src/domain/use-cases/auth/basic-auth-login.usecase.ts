import { IUserRepository } from '@domain/interfaces';
import { HashComparer } from '@domain/interfaces/protocols/cryptography.protocol';
import { User } from '@domain/models';

type Setup = (
  userRepository: IUserRepository,
  cryptography: HashComparer,
) => BasicAuthLoginUsecase;

export type BasicAuthLoginUsecase = (basic: string) => Promise<User>;

export const setupBasicAuthLoginUsecase: Setup =
  (userRepository, cryptography) => async (basic) => {
    const [, basicEncode] = basic.split(/[ ]/g);
    const decode = Buffer.from(basicEncode, 'base64').toString('utf-8');
    const [email, password] = decode.split(/[:]/g);

    const user = await userRepository.get({
      filter: { email },
      fields: ['email', 'password'],
    });

    const valid = await cryptography.compare(password, user.password as string);

    if (valid) {
      return user;
    } else {
      throw new Error('Password is incorrect');
    }
  };
