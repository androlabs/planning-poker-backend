import { BcryptService, makeBcryptService } from '@application/services/crypto';
import { IUserRepository } from '@domain/interfaces';
import { User } from '@domain/models';
import { BasicAuthLoginUseCase } from '@domain/use-cases';
import { makeUserRepository } from '@infra/mongodb/repos';

export class BasicAuthLoginService implements BasicAuthLoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async perform(basic: string): Promise<User> {
    const [, basicEncode] = basic.split(/[ ]/g);
    const decode = Buffer.from(basicEncode, 'base64').toString('utf-8');
    const [email, password] = decode.split(/[:]/g);

    const user = await this.userRepository.get({
      filter: { email },
      fields: ['email', 'password'],
    });

    const valid = await this.bcryptService.compare(
      password,
      user.password as string,
    );

    if (valid) {
      return user;
    } else {
      throw new Error('Password is incorrect');
    }
  }
}

export const makeBasicAuthLoginService = (): BasicAuthLoginService => {
  return new BasicAuthLoginService(makeUserRepository(), makeBcryptService());
};
