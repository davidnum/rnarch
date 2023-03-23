import { injectable } from 'inversify';

import {
  SomeReportScreenProps,
  SomeReportScreenViewModel,
} from './some-report-screen.types';

import {
  SomeReportModel,
  GetSomeReportUseCase,
} from '#features/some-report/domain';

@injectable()
export class SomeReportScreenViewModelImpl
  implements SomeReportScreenViewModel
{
  private props?: SomeReportScreenProps;
  private text = '';
  private isLoading = false;
  private hasError = false;

  constructor(private readonly getSomeReportUseCase: GetSomeReportUseCase) {}

  public init() {
    this.getSomeReport();
  }

  public update(props: SomeReportScreenProps) {
    this.props = props;
  }

  public dispose() {}

  public get viewActions() {
    return {
      finish: this.props?.onFinished,
    };
  }

  public get viewState() {
    return {
      text: this.text,
      isLoading: this.isLoading,
      hasError: this.hasError,
    };
  }

  private async getSomeReport() {
    this.isLoading = true;
    this.hasError = false;

    const result = await this.getSomeReportUseCase.execute();
    result.fold(this.handleGetSomeReportError, this.handleGetSomeReportSuccess);
  }

  private handleGetSomeReportSuccess = (data: SomeReportModel) => {
    this.text = data.text;
    this.isLoading = false;
  };

  private handleGetSomeReportError = () => {
    this.hasError = true;
    this.isLoading = false;
  };
}
