import { BaseFailure, Failure } from '#core';

const CODE = 'GET_SOME_REPORT_ERROR';

export class GetSomeReportFailure extends BaseFailure {
  public static is(failure: Failure): failure is GetSomeReportFailure {
    return failure.code === CODE;
  }

  public static fromFailure(failure: Failure): GetSomeReportFailure {
    return new GetSomeReportFailure(failure.message);
  }

  public static fromError(error: Error): GetSomeReportFailure {
    return new GetSomeReportFailure(error.message);
  }

  public readonly code: typeof CODE = CODE;
}
