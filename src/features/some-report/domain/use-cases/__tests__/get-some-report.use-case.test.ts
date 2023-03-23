import { mock } from 'jest-mock-extended';
import { Either } from 'monet';

import { Failure } from '#core';

import { GetSomeReportFailure } from '#features/some-report/domain/failures';
import { SomeReportModel } from '#features/some-report/domain/models';
import { SomeReportRepository } from '#features/some-report/domain/repositories';
import { GetSomeReportUseCase } from '#features/some-report/domain/use-cases';
import { HttpFailure } from '#infrastructure/http';
import { ModelValidator } from '#shared/validation';

describe('GetSomeReportUseCase', () => {
  const setupUseCase = (either: Either<Failure, SomeReportModel>) => {
    const repo = mock<SomeReportRepository>();
    repo.getSomeReport.mockResolvedValue(either);
    const validator = mock<ModelValidator>();
    validator.validate.mockImplementation(() => () => either);
    return new GetSomeReportUseCase(repo, validator);
  };

  it('should return an some-report if succeed', async () => {
    // arrange
    const useCase = setupUseCase(Either.right({ text: 'some-report' }));

    // act
    const result = await useCase.execute();

    // assert
    expect(result.isRight()).toBeTruthy();
    expect(result.right()).toEqual({ text: 'some-report' });
  });

  it('should return an failure if failed', async () => {
    // arrange
    const useCase = setupUseCase(Either.left(new HttpFailure('error')));

    // act
    const result = await useCase.execute();

    // assert
    expect(result.isLeft()).toBeTruthy();
    expect(result.left()).toBeInstanceOf(GetSomeReportFailure);
  });
});
