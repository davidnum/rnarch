import { ContainerModule, interfaces } from 'inversify';

import { HttpClient } from './http';
import { Logger, LoggerAdapter } from './logger';
import { Router } from './router';

export class InfrastructureModule {
  public static configure(): ContainerModule {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind<Logger>(Logger)
        .toDynamicValue((context: interfaces.Context) => {
          const logger = new Logger(
            context.container.getAll(LoggerAdapter),
            context.currentRequest.target.getNamedTag()?.value,
          );
          return logger;
        })
        .inTransientScope();
      bind<Router>(Router).toSelf().inRequestScope();
      bind<HttpClient>(HttpClient).toSelf().inRequestScope();
    });
  }
}
