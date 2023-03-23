import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';

import { ViewModel } from '#core/types';

export const withViewModel =
  <
    Props,
    ViewState,
    ViewActions,
    VM extends ViewModel<Props, ViewState, ViewActions>,
  >(
    viewModelFactory: () => VM,
  ) =>
  (
    Component: React.FunctionComponent<{
      state: ViewState;
      actions: ViewActions;
    }>,
  ) => {
    const wrappedComponent = observer((props: Props) => {
      const [viewModel] = useState(() =>
        makeAutoObservable(viewModelFactory()),
      );

      useEffect(() => {
        viewModel.update(props);
      }, [props, viewModel]);

      useEffect(() => {
        viewModel.init();

        return () => {
          viewModel.dispose();
        };
      }, [viewModel]);

      return (
        <Component
          state={viewModel.viewState}
          actions={viewModel.viewActions}
        />
      );
    });

    wrappedComponent.displayName = `withViewModel(${Component.displayName})`;
    return wrappedComponent;
  };
