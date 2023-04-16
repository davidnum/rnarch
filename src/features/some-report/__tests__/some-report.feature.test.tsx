import { fireEvent, render } from '@testing-library/react-native';
import { Container } from 'inversify';
import { mock } from 'jest-mock-extended';
import { Either } from 'monet';
import React from 'react';

import { SomeReportFeature } from '../some-report.feature';
import { SomeReportFeatureCoordinator } from '../types';

import { HttpClient, HttpFailure } from '#infrastructure/http';
import { Router, RouterAdapter } from '#infrastructure/router';
import {
  FakeRouterAdapter,
  StackView,
} from '#infrastructure/router/adapters/fake.router-adapter';
import { CommonModule } from '#shared/module';

describe('SomeReportFeature', () => {
  it('should provide SomeReportFeatureCoordinator', () => {
    // arrange
    const container = new Container();
    container.load(CommonModule.configure());
    container.bind(Router).toConstantValue(mock<Router>());
    container.bind(HttpClient).toConstantValue(mock<HttpClient>());
    const module = SomeReportFeature.configure();
    container.load(module);

    // act
    const coordinator = container.get(SomeReportFeatureCoordinator);

    // assert
    expect(coordinator).toBeDefined();
  });
});

describe('SomeReportFeature flow', () => {
  const setupFeature = (httpClient: HttpClient) => {
    const onFlowCompleted = jest.fn();
    const container = new Container();
    const routerAdapter = new FakeRouterAdapter();

    container.load(CommonModule.configure());

    container.bind(RouterAdapter).toConstantValue(routerAdapter);
    container.bind(Router).toSelf();
    container.bind(HttpClient).toConstantValue(httpClient);

    const module = SomeReportFeature.configure();
    container.load(module);

    const coordinator = container.get(SomeReportFeatureCoordinator);
    coordinator.init();
    coordinator.startFlow({ onFlowCompleted });

    const screen = render(<StackView stack={routerAdapter.stack} />);

    return { onFlowCompleted, screen };
  };

  it('display loader -> display text -> press button finish', async () => {
    // arrange
    const httpClient = mock<HttpClient>();
    httpClient.get.mockResolvedValue(
      Either.right({ data: { value: 'SomeReport' } }),
    );
    const { onFlowCompleted, screen } = setupFeature(httpClient);

    // assert
    expect(await screen.findByText('Loading')).toBeVisible();
    expect(await screen.findByText('SomeReport')).toBeVisible();

    fireEvent.press(await screen.findByText('Finish'));

    expect(onFlowCompleted).toBeCalled();
  });

  it('display loader -> display error', async () => {
    // arrange
    const httpClient = mock<HttpClient>();
    httpClient.get.mockResolvedValue(Either.left(new HttpFailure('Error')));
    const { screen } = setupFeature(httpClient);

    // assert
    expect(await screen.findByText('Loading')).toBeVisible();
    expect(await screen.findByText('Error')).toBeVisible();
  });
});
