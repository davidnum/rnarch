import { Either } from 'monet';

import { Coordinator } from '#core';

import { CoordinatorFlowFailure } from '#shared/failures';

export interface CoordinatorProps {
  onFlowCompleted(): void;
}

export abstract class SomeReportFeatureCoordinator extends Coordinator {
  public abstract startFlow(
    props: CoordinatorProps,
  ): Either<CoordinatorFlowFailure, void>;
}
