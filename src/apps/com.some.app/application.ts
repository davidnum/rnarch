import 'reflect-metadata';

import { Container, injectable } from 'inversify';

import { Coordinator } from './coordinator';
import { Features } from './features';

import { SomeReportFeature } from '#features/some-report';
import { InfrastructureModule } from '#infrastructure/module';
import { CommonModule } from '#shared/module';

@injectable()
export class Application {
  public static async bootstrap() {
    const container = new Container();

    // Common
    container.load(CommonModule.configure());

    // Infrastructure
    container.load(InfrastructureModule.configure());

    // Features
    container.load(SomeReportFeature.configure());
    container.bind(Features).toSelf().inRequestScope();

    // Application
    container.bind(Coordinator).toSelf().inSingletonScope();
    container.bind(Application).toSelf().inSingletonScope();

    container.get(Application).start();
  }

  constructor(private readonly coordinator: Coordinator) {}

  public async start() {
    await this.coordinator.start();
  }
}
