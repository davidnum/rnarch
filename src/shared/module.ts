import { ContainerModule, interfaces } from 'inversify';

import { ModelValidator } from './validation';

export class CommonModule {
  public static configure() {
    return new ContainerModule((bind: interfaces.Bind) => {
      bind(ModelValidator).toSelf().inSingletonScope();
    });
  }
}
