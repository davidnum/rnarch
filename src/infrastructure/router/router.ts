import { injectable } from 'inversify';

import { RouterAdapter } from './adapters';

@injectable()
export class Router {
  constructor(private adapter: RouterAdapter) {}

  public bootstrap<Params>(params: Params) {
    return this.adapter.bootstrap(params);
  }

  public registerComponent<Props extends {}>(
    componentName: string,
    componentProvider: () => React.ComponentType<Props>,
  ) {
    this.adapter.registerComponent(componentName, componentProvider);
  }

  public setStackRoot<Props extends {}>(componentName: string, props: Props) {
    this.adapter.setStackRoot(componentName, props);
  }

  public push<Props extends {}>(componentName: string, props: Props) {
    this.adapter.push(componentName, props);
  }

  public pop() {
    this.adapter.pop();
  }
}
