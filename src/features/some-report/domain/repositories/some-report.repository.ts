import { Either } from 'monet';

import { Failure } from '#core';

import { SomeReportModel } from '#features/some-report/domain/models';

export abstract class SomeReportRepository {
  public abstract getSomeReport(): Promise<Either<Failure, SomeReportModel>>;
}
