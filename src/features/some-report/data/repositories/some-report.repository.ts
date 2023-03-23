import { injectable } from 'inversify';
import { Either } from 'monet';

import { Failure } from '#core';

import { SomeReportDataMapper } from '#features/some-report/data/data-mappers';
import { SomeReportRemoteDataSource } from '#features/some-report/data/data-sources';
import {
  SomeReportModel,
  SomeReportRepository,
} from '#features/some-report/domain';

@injectable()
export class SomeReportRepositoryImpl implements SomeReportRepository {
  constructor(
    private readonly dataSource: SomeReportRemoteDataSource,
    private readonly dataMapper: SomeReportDataMapper,
  ) {}

  public async getSomeReport(): Promise<Either<Failure, SomeReportModel>> {
    const result = await this.dataSource.getSomeReport();
    return result.map(this.dataMapper.toModel);
  }
}
