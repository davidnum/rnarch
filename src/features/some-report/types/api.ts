import { SomeReportFeatureCoordinator } from './coordinator';

export abstract class SomeReportFeatureApi {
  public abstract readonly coordinator: SomeReportFeatureCoordinator;
}
