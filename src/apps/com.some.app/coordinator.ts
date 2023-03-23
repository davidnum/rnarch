import { injectable } from 'inversify';

import { Features } from './features';

import { Router } from '#infrastructure/router';

@injectable()
export class Coordinator {
  constructor(
    private readonly router: Router,
    private readonly features: Features,
  ) {}

  public async start() {
    this.features.init();

    await this.router.bootstrap({
      sideMenu: { id: 'sideMenu', name: 'sideMenu' },
    });

    this.features.someReport.coordinator.startFlow({
      onFlowCompleted: () => {
        console.log('finished');
      },
    });
  }
}
