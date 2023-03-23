import { mock } from 'jest-mock-extended';
import { Either } from 'monet';

import { SomeReportRemoteDataSource } from '#features/some-report/data/data-sources';
import { HttpClient, HttpFailure } from '#infrastructure/http';

describe('SomeReportRemoteDataSource', () => {
  it('should return an some-report if succeed', async () => {
    // arrange
    const httpClient = mock<HttpClient>();
    httpClient.get.mockResolvedValue(
      Either.right({ data: { text: 'some-report' } }),
    );
    const dataSource = new SomeReportRemoteDataSource(httpClient);

    // act
    const result = await dataSource.getSomeReport();

    // assert
    expect(result.right()).toEqual({ text: 'some-report' });
  });

  it('should return a failure if failed', async () => {
    // arrange
    const httpClient = mock<HttpClient>();
    httpClient.get.mockResolvedValue(Either.left(new HttpFailure('error')));
    const dataSource = new SomeReportRemoteDataSource(httpClient);

    // act
    const result = await dataSource.getSomeReport();

    // assert
    expect(result.left()).toBeInstanceOf(HttpFailure);
  });
});
