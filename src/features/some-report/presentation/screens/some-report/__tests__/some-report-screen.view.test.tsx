import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { act } from 'react-test-renderer';

import { SomeReportScreen } from '#features/some-report/presentation/screens/some-report';

describe('SomeReport screen', () => {
  it('should render text from state', () => {
    // arrange
    const { getByText } = render(
      <SomeReportScreen
        actions={{ finish: jest.fn() }}
        state={{ text: 'Screen', isLoading: false, hasError: false }}
      />,
    );

    // act
    const text = getByText('Screen');

    // assert
    expect(text).toBeVisible();
  });

  it('should render loading state', () => {
    // arrange
    const { getByText } = render(
      <SomeReportScreen
        actions={{ finish: jest.fn() }}
        state={{ text: 'Screen', isLoading: true, hasError: false }}
      />,
    );

    // act
    const text = getByText('Loading');

    // assert
    expect(text).toBeVisible();
  });

  it('should render error state', () => {
    // arrange

    const { getByText } = render(
      <SomeReportScreen
        actions={{ finish: jest.fn() }}
        state={{ text: 'Screen', isLoading: false, hasError: true }}
      />,
    );

    // act
    const text = getByText('Error');

    // assert
    expect(text).toBeVisible();
  });

  it('should call finish action when button pressed', () => {
    // arrange
    const finish = jest.fn();
    const { getByText } = render(
      <SomeReportScreen
        actions={{ finish }}
        state={{ text: '', isLoading: false, hasError: false }}
      />,
    );

    // act

    act(() => {
      fireEvent.press(getByText('Finish'));
    });

    // assert
    expect(finish).toBeCalled();
  });
});
