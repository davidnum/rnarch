import { injectable } from 'inversify';
import { ComponentType } from 'react';
import { Navigation } from 'react-native-navigation';

import { RouterAdapter } from './router-adapter';

interface RootParams {
  sideMenu: {
    id: string;
    name: string;
  };
}

const MAIN_STACK_ID = 'MainStack';

@injectable()
export class RNNRouterAdapter implements RouterAdapter {
  constructor() {
    //  Navigation.setDefaultOptions({
  }

  public async bootstrap<Params = RootParams>(_params: Params) {
    await new Promise<void>(resolve =>
      Navigation.events().registerAppLaunchedListener(resolve),
    );

    Navigation.setRoot({
      root: {
        sideMenu: {
          center: {
            stack: {
              id: MAIN_STACK_ID,
            },
          },
          // left: {
          //   component: params.sideMenu,
          // },
        },
      },
    });
  }

  public registerComponent<Props>(
    componentName: string,
    componentProvider: () => ComponentType<Props>,
  ) {
    Navigation.registerComponent(componentName, componentProvider);
  }

  public push<Props>(componentName: string, props: Props) {
    Navigation.push(MAIN_STACK_ID, {
      component: {
        name: componentName,
        passProps: props,
      },
    });
  }

  public pop() {
    Navigation.pop(MAIN_STACK_ID);
  }

  public setStackRoot<Props>(componentName: string, props: Props) {
    Navigation.setStackRoot(MAIN_STACK_ID, {
      component: {
        name: componentName,
        passProps: props,
        options: {
          sideMenu: {
            left: {
              visible: false,
            },
          },
        },
      },
    });
  }
}
