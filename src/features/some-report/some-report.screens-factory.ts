import { inject, injectable, interfaces } from 'inversify';

import { withViewModel } from '#core';

import {
  SomeReportScreen,
  SomeReportScreenProps,
  SomeReportScreenViewActions,
  SomeReportScreenViewModel,
  SomeReportScreenViewState,
} from './presentation';

@injectable()
export class ScreensFactory {
  constructor(
    @inject(SomeReportScreenViewModel.autoFactory)
    private readonly someReportScreenViewModel: interfaces.AutoFactory<SomeReportScreenViewModel>,
  ) {}

  public createSomeReportScreen =
    (): React.ComponentType<SomeReportScreenProps> => {
      return withViewModel<
        SomeReportScreenProps,
        SomeReportScreenViewState,
        SomeReportScreenViewActions,
        SomeReportScreenViewModel
      >(this.someReportScreenViewModel)(SomeReportScreen);
    };
}
