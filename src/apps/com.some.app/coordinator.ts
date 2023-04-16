import { injectable, named } from 'inversify';

import { Features } from './features';

import { Logger } from '#infrastructure/logger';
import { Router } from '#infrastructure/router';

@injectable()
export class Coordinator {
  constructor(
    private readonly router: Router,
    private readonly features: Features,
    @named('AppCoordinator') private readonly logger: Logger,
  ) {}

  public start = async () => {
    this.features.init();

    await this.router.bootstrap({
      sideMenu: { id: 'sideMenu', name: 'sideMenu' },
    });

    this.features.someReport.coordinator.startFlow({
      onFlowCompleted: () => {
        this.logger.log('INFO', 'Flow completed');
      },
    });
  };
}
