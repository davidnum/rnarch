import { BaseFailure, Failure } from '#core';

const CODE = 'COORDINATOR_FLOW_ERROR';

export class CoordinatorFlowFailure extends BaseFailure {
  public static is(failure: Failure): failure is CoordinatorFlowFailure {
    return failure.code === CODE;
  }

  public readonly code: typeof CODE = CODE;
}
