import { render } from '@testing-library/react-native';
import { mock } from 'jest-mock-extended';
import React from 'react';

import { withViewModel } from '#core/hoc';
import { ViewModel } from '#core/types';

jest.mock('mobx', () => ({
  ...jest.requireActual('mobx'),
  makeAutoObservable: jest.fn(viewModel => viewModel),
}));

type Props = { prop: string };
type ViewState = { value: string };
type ViewActions = { setValue: (value: string) => void };
type VM = ViewModel<Props, ViewState, ViewActions>;

describe('with view model HOC', () => {
  it('should provide view state and view actions to wrapped component', () => {
    // arrange
    const viewModel = mock<VM>();
    const Component = jest.fn().mockReturnValue(null);
    const WrappedComponent = withViewModel<Props, ViewState, ViewActions, VM>(
      () => viewModel,
    )(Component);

    // act
    render(<WrappedComponent prop="prop" />);

    // assert
    expect(Component).toBeCalledWith(
      { state: viewModel.viewState, actions: viewModel.viewActions },
      {},
    );
  });

  describe('view model lifecycle methods', () => {
    it('should call init on mount', () => {
      // arrange
      const viewModel = mock<VM>();
      const Component = jest.fn().mockReturnValue(null);
      const WrappedComponent = withViewModel<Props, ViewState, ViewActions, VM>(
        () => viewModel,
      )(Component);

      // act
      render(<WrappedComponent prop="prop" />);

      // assert
      expect(viewModel.init).toBeCalled();
    });

    it('should call dispose on unmount', () => {
      // arrange
      const viewModel = mock<VM>();
      const Component = jest.fn().mockReturnValue(null);
      const WrappedComponent = withViewModel<Props, ViewState, ViewActions, VM>(
        () => viewModel,
      )(Component);

      // act
      const wrapper = render(<WrappedComponent prop="prop" />);
      wrapper.unmount();

      // assert
      expect(viewModel.dispose).toBeCalled();
    });

    it('should call onUpdate when props is updated', () => {
      // arrange

      const viewModel = mock<ViewModel<Props, ViewState, ViewActions>>();
      const Component = jest.fn().mockReturnValue(null);
      const WrappedComponent = withViewModel<Props, ViewState, ViewActions, VM>(
        () => viewModel,
      )(Component);

      // act
      const wrapper = render(<WrappedComponent prop="Some prop" />);
      wrapper.update(<WrappedComponent prop="Another prop" />);

      // assert
      expect(viewModel.update.mock.calls[0]).toEqual([{ prop: 'Some prop' }]);
      expect(viewModel.update.mock.calls[1]).toEqual([
        {
          prop: 'Another prop',
        },
      ]);
    });
  });
});
