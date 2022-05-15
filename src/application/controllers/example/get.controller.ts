import { ControllerContract } from '@domain/contracts';
import { Http } from '@main/interfaces';

class ExampleGetController implements ControllerContract {
  constructor(private dependencyInjection: number) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    // TODO Invoke use case get example here
    console.log(request);
    if (true) {
      throw new Error('any_error');
    }
    // return {
    //   statusCode: 200,
    //   data: {
    //     any: 'value',
    //   },
  }
}

export const makeExampleGetController = (): ExampleGetController => {
  return new ExampleGetController(1);
};
