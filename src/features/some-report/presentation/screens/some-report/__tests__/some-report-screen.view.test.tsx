import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

import { SomeReportScreen } from '#features/some-report/presentation/screens/some-report';

describe('SomeReport screen', () => {
  it('should render text from state', async () => {
    // arrange
    const screen = render(
      <SomeReportScreen
        actions={{ finish: jest.fn() }}
        state={{ text: 'Screen', isLoading: false, hasError: false }}
      />,
    );

    // assert
    expect(await screen.findByText('Screen')).toBeVisible();
  });

  it('should render loading state', async () => {
    // arrange
    const screen = render(
      <SomeReportScreen
        actions={{ finish: jest.fn() }}
        state={{ text: 'Screen', isLoading: true, hasError: false }}
      />,
    );

    // assert
    expect(await screen.findByText('Loading')).toBeVisible();
  });

  it('should render error state', async () => {
    // arrange

    const screen = render(
      <SomeReportScreen
        actions={{ finish: jest.fn() }}
        state={{ text: 'Screen', isLoading: false, hasError: true }}
      />,
    );

    // assert
    expect(await screen.findByText('Error')).toBeVisible();
  });

  it('should call finish action when button pressed', async () => {
    // arrange
    const finish = jest.fn();
    const screen = render(
      <SomeReportScreen
        actions={{ finish }}
        state={{ text: '', isLoading: false, hasError: false }}
      />,
    );

    // act
    fireEvent.press(await screen.findByText('Finish'));

    // assert
    expect(finish).toBeCalled();
  });
});
