import { BaseFailure, Failure } from '#core';

const CODE = 'COORDINATOR_INIT_ERROR';

export class CoordinatorInitFailure extends BaseFailure {
  public static is(failure: Failure): failure is CoordinatorInitFailure {
    return failure.code === CODE;
  }

  public readonly code: typeof CODE = CODE;
}
