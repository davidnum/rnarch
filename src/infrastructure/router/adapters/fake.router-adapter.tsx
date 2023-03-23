import { injectable } from 'inversify';
import React, { ComponentType } from 'react';

import { RouterAdapter } from './router-adapter';

type Stack = { screen: ComponentType; props: {} }[];

@injectable()
export class FakeRouterAdapter implements RouterAdapter {
  private registeredScreens = new Map<string, () => ComponentType>();

  public stack: Stack = [];

  public bootstrap() {
    return Promise.resolve();
  }

  public registerComponent<Props extends {}>(
    componentName: string,
    componentProvider: () => ComponentType<Props>,
  ) {
    this.registeredScreens.set(
      componentName,
      componentProvider as () => ComponentType,
    );
  }

  public setStackRoot<Props extends {}>(componentName: string, props: Props) {
    if (!this.registeredScreens.has(componentName)) {
      throw new Error(`Component ${componentName} is not registered`);
    }

    this.stack = [];
    this.push(componentName, props);
  }

  public push<Props extends {}>(componentName: string, props: Props) {
    if (!this.registeredScreens.has(componentName)) {
      throw new Error(`Component ${componentName} is not registered`);
    }

    this.stack.push({
      screen: this.registeredScreens.get(componentName)!(),
      props,
    });
  }

  public pop() {
    this.stack.pop();
  }
}

export const StackView = ({ stack }: { stack: Stack }) => {
  return (
    <>
      {stack.map(({ screen: Screen, props }) => (
        <Screen key={Screen.displayName} {...props} />
      ))}
    </>
  );
};
