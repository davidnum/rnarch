import { injectable } from 'inversify';
import { Either } from 'monet';

import { Failure } from '#core';

@injectable()
export class ModelValidator {
  public validate<Model, F extends Failure>(
    validate: (value: Model) => Model,
    failureFactory: (error: Error) => F,
  ) {
    return (value: Model) =>
      Either.fromTry(() => validate(value)).leftMap(failureFactory);
  }
}
