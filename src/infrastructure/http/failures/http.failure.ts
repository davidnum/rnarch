import { BaseFailure, Failure } from '#core';

const CODE = 'HTTP_ERROR';

export class HttpFailure extends BaseFailure {
  public static is(failure: Failure): failure is HttpFailure {
    return failure.code === CODE;
  }

  public static fromError(error: Error): HttpFailure {
    return new HttpFailure(error.message);
  }

  public readonly code: typeof CODE = CODE;
}
