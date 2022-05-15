import { ControllerContract } from '@domain/contracts';
import { HttpResponse } from '@main/interfaces';
import { Request } from 'express';

class ExampleGetController implements ControllerContract {
  constructor(private dependencyInjection: number) {}

  async handle(request: Request): Promise<HttpResponse> {
    // TODO Invoke use case get example here
    return {
      statusCode: 200,
      data: {
        any: 'value',
      },
    };
  }
}

export const makeExampleGetController = (): ExampleGetController => {
  return new ExampleGetController(1);
};
