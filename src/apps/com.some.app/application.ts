import 'reflect-metadata';

import { Container, injectable } from 'inversify';

import { Coordinator } from './coordinator';
import { Features } from './features';
import { HttpClientEnvironmentImpl } from './http-client.environment';

import { SomeReportFeature } from '#features/some-report';
import {
  AxiosHttpAdapter,
  HttpClientAdapter,
  HttpClientEnvironment,
} from '#infrastructure/http';
import { ConsoleLoggerAdapter, LoggerAdapter } from '#infrastructure/logger';
import { InfrastructureModule } from '#infrastructure/module';
import { RNNRouterAdapter, RouterAdapter } from '#infrastructure/router';
import { CommonModule } from '#shared/module';

@injectable()
export class Application {
  public static async bootstrap() {
    const container = new Container();

    // Common
    container.load(CommonModule.configure());

    // Infrastructure
    container
      .bind<LoggerAdapter>(LoggerAdapter)
      .to(ConsoleLoggerAdapter)
      .inRequestScope();

    container
      .bind<HttpClientEnvironment>(HttpClientEnvironment)
      .to(HttpClientEnvironmentImpl)
      .inRequestScope();
    container
      .bind<HttpClientAdapter>(HttpClientAdapter)
      .to(AxiosHttpAdapter)
      .inRequestScope();

    container
      .bind<RouterAdapter>(RouterAdapter)
      .to(RNNRouterAdapter)
      .inRequestScope();
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
