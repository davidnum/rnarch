import { inject, injectable } from 'inversify';

import { SomeReportFeatureApi } from '#features/some-report';

@injectable()
export class Features {
  @inject(SomeReportFeatureApi)
  public readonly someReport!: SomeReportFeatureApi;

  public init() {
    this.someReport.coordinator.init();
  }
}
