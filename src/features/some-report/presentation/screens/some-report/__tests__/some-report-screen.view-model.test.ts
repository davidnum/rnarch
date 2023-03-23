import { mock } from 'jest-mock-extended';
import { Either } from 'monet';

import {
  GetSomeReportUseCase,
  GetSomeReportFailure,
} from '#features/some-report/domain';
import { SomeReportScreenViewModelImpl } from '#features/some-report/presentation/screens/some-report';

describe('SomeReport screen view model', () => {
  it('should have correct initial state', () => {
    // arrange
    const getSomeReportUseCase = mock<GetSomeReportUseCase>();

    // act
    const viewModel = new SomeReportScreenViewModelImpl(getSomeReportUseCase);

    // assert
    expect(viewModel.viewState).toEqual({
      text: '',
      isLoading: false,
      hasError: false,
    });
  });

  it('should call GetSomeReportUseCase on init', async () => {
    // arrange
    const getSomeReportUseCase = mock<GetSomeReportUseCase>();
    getSomeReportUseCase.execute.mockResolvedValue(Either.Right({ text: '' }));
    const viewModel = new SomeReportScreenViewModelImpl(getSomeReportUseCase);

    // act
    viewModel.init();

    // assert
    expect(getSomeReportUseCase.execute).toBeCalled();
  });

  it('should have correct state when GetSomeReportUseCase started', async () => {
    // arrange
    const getSomeReportUseCase = mock<GetSomeReportUseCase>();
    getSomeReportUseCase.execute.mockResolvedValue(Either.Right({ text: '' }));
    const viewModel = new SomeReportScreenViewModelImpl(getSomeReportUseCase);

    // act
    viewModel.init();

    // assert
    expect(viewModel.viewState).toEqual({
      text: '',
      isLoading: true,
      hasError: false,
    });
  });

  it('should have correct state when GetSomeReportUseCase succeeded', async () => {
    // arrange
    const getSomeReportUseCase = mock<GetSomeReportUseCase>();
    getSomeReportUseCase.execute.mockResolvedValue(
      Either.right({ text: 'some-report' }),
    );
    const viewModel = new SomeReportScreenViewModelImpl(getSomeReportUseCase);

    // act
    viewModel.init();
    await new Promise(process.nextTick);

    // assert
    expect(viewModel.viewState).toEqual({
      text: 'some-report',
      isLoading: false,
      hasError: false,
    });
  });

  it('should have correct state when GetSomeReportUseCase failed', async () => {
    // arrange
    const getSomeReportUseCase = mock<GetSomeReportUseCase>();
    getSomeReportUseCase.execute.mockResolvedValue(
      Either.left(new GetSomeReportFailure('error')),
    );
    const viewModel = new SomeReportScreenViewModelImpl(getSomeReportUseCase);

    // act
    viewModel.init();
    await new Promise(process.nextTick);

    // assert
    expect(viewModel.viewState).toEqual({
      text: '',
      isLoading: false,
      hasError: true,
    });
  });

  it('should call onFinish from props when finish action performed', async () => {
    // arrange
    const getSomeReportUseCase = mock<GetSomeReportUseCase>();
    const onFinish = jest.fn();
    getSomeReportUseCase.execute.mockResolvedValue(Either.Right({ text: '' }));
    const viewModel = new SomeReportScreenViewModelImpl(getSomeReportUseCase);

    // act
    viewModel.update({ onFinished: onFinish });
    viewModel.viewActions.finish?.();

    // assert
    expect(onFinish).toBeCalled();
  });
});
