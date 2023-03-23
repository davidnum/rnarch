import { injectable } from 'inversify';
import { Either } from 'monet';

import { SomeReportScreenProps } from './presentation';
import { ScreensFactory } from './some-report.screens-factory';
import {
  SomeReportFeatureCoordinator,
  CoordinatorProps,
  Screens,
} from './types';

import { Router } from '#infrastructure/router';
import { CoordinatorFlowFailure } from '#shared/failures';

@injectable()
export class SomeReportFeatureCoordinatorImpl
  implements SomeReportFeatureCoordinator
{
  private isInitialized = false;

  constructor(
    private readonly router: Router,
    private readonly screenFactories: ScreensFactory,
  ) {}

  public init = (): void => {
    if (this.isInitialized) {
      return;
    }

    this.router.registerComponent<SomeReportScreenProps>(
      Screens.SomeReport,
      this.screenFactories.createSomeReportScreen,
    );
    this.isInitialized = true;
  };

  public startFlow = (
    props: CoordinatorProps,
  ): Either<CoordinatorFlowFailure, void> => {
    if (!this.isInitialized) {
      return Either.Left(
        new CoordinatorFlowFailure('SomeReportCoordinator is not initialized'),
      );
    }

    this.router.setStackRoot<SomeReportScreenProps>(Screens.SomeReport, {
      onFinished: props.onFlowCompleted,
    });

    return Either.Right(undefined);
  };
}
