import { ContainerModule, injectable, interfaces } from 'inversify';

import {
  SomeReportDataMapper,
  SomeReportRemoteDataSource,
  SomeReportRepositoryImpl,
} from './data';
import { SomeReportRepository, GetSomeReportUseCase } from './domain';
import {
  SomeReportScreenViewModel,
  SomeReportScreenViewModelImpl,
} from './presentation';
import { SomeReportFeatureCoordinatorImpl } from './some-report.coordinator';
import { ScreensFactory } from './some-report.screens-factory';
import { SomeReportFeatureApi, SomeReportFeatureCoordinator } from './types';

@injectable()
export class SomeReportFeature implements SomeReportFeatureApi {
  public static configure() {
    return new ContainerModule((bind: interfaces.Bind) => {
      // Data
      bind(SomeReportRemoteDataSource).toSelf().inSingletonScope();
      bind(SomeReportDataMapper).toSelf().inSingletonScope();
      bind<SomeReportRepository>(SomeReportRepository)
        .to(SomeReportRepositoryImpl)
        .inSingletonScope();

      // Domain
      bind(GetSomeReportUseCase).toSelf().inTransientScope();

      // View models
      bind<SomeReportScreenViewModel>(SomeReportScreenViewModel)
        .to(SomeReportScreenViewModelImpl)
        .inTransientScope();
      bind<interfaces.Factory<SomeReportScreenViewModel>>(
        SomeReportScreenViewModel.autoFactory,
      ).toAutoFactory<SomeReportScreenViewModel>(SomeReportScreenViewModel);

      // Screens
      bind(ScreensFactory).toSelf().inTransientScope();

      // Coordinator
      bind<SomeReportFeatureCoordinator>(SomeReportFeatureCoordinator)
        .to(SomeReportFeatureCoordinatorImpl)
        .inRequestScope();

      // Feature
      bind<SomeReportFeatureApi>(SomeReportFeatureApi)
        .to(SomeReportFeature)
        .inRequestScope();
    });
  }

  constructor(public readonly coordinator: SomeReportFeatureCoordinator) {}
}

export { SomeReportFeatureApi };
