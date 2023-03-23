import { Failure } from '#core/types';

export abstract class BaseFailure implements Failure {
  public abstract readonly code: string;

  constructor(public readonly message: string) {}
}
