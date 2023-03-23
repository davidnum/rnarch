import { mock } from 'jest-mock-extended';
import { Either } from 'monet';

import { SomeReportDataMapper } from '#features/some-report/data/data-mappers';
import { SomeReportRemoteDataSource } from '#features/some-report/data/data-sources';
import { SomeReportRepositoryImpl } from '#features/some-report/data/repositories';
import { HttpFailure } from '#infrastructure/http';

describe('SomeReportRepository', () => {
  it('should return an some-report if succeed', async () => {
    // arrange
    const dataMapper = new SomeReportDataMapper();
    const dataSource = mock<SomeReportRemoteDataSource>();
    dataSource.getSomeReport.mockResolvedValue(
      Either.right({ value: 'some-report' }),
    );
    const repo = new SomeReportRepositoryImpl(dataSource, dataMapper);

    // act
    const result = await repo.getSomeReport();

    // assert
    expect(result.isRight()).toBeTruthy();
    expect(result.right()).toEqual({ text: 'some-report' });
  });

  it('should return an error if failure', async () => {
    // arrange
    const dataMapper = new SomeReportDataMapper();
    const dataSource = mock<SomeReportRemoteDataSource>();
    dataSource.getSomeReport.mockResolvedValue(
      Either.left(new HttpFailure('error')),
    );
    const repo = new SomeReportRepositoryImpl(dataSource, dataMapper);

    // act
    const result = await repo.getSomeReport();

    // assert
    expect(result.isLeft()).toBeTruthy();
    expect(result.left()).toBeInstanceOf(HttpFailure);
  });
});
