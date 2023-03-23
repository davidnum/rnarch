import { injectable } from 'inversify';
import { Either } from 'monet';

import { UseCase } from '#core';

import { GetSomeReportFailure } from '#features/some-report/domain/failures';
import {
  SomeReportModel,
  SomeReportModelSchema,
} from '#features/some-report/domain/models';
import { SomeReportRepository } from '#features/some-report/domain/repositories';
import { ModelValidator } from '#shared/validation';

@injectable()
export class GetSomeReportUseCase
  implements UseCase<Either<GetSomeReportFailure, SomeReportModel>>
{
  constructor(
    private readonly someReportRepository: SomeReportRepository,
    private readonly validator: ModelValidator,
  ) {}

  public async execute() {
    const result = await this.someReportRepository.getSomeReport();
    return result
      .flatMap(
        this.validator.validate(
          SomeReportModelSchema.parse,
          GetSomeReportFailure.fromError,
        ),
      )
      .leftMap(GetSomeReportFailure.fromFailure);
  }
}
