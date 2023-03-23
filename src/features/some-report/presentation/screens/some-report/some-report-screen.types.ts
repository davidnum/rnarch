import { ViewModel } from '#core';

export interface SomeReportScreenProps {
  onFinished(): void;
}

export interface SomeReportScreenViewState {
  readonly isLoading: boolean;
  readonly hasError: boolean;
  readonly text: string;
}

export interface SomeReportScreenViewActions {
  finish?(): void;
}

export abstract class SomeReportScreenViewModel extends ViewModel<
  SomeReportScreenProps,
  SomeReportScreenViewState,
  SomeReportScreenViewActions
> {
  public static readonly autoFactory = Symbol(
    'SomeReportScreenViewModel.autoFactory',
  );
}
