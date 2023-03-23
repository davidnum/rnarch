import { mock } from 'jest-mock-extended';

import { SomeReportFeatureCoordinatorImpl } from '../some-report.coordinator';
import { ScreensFactory } from '../some-report.screens-factory';
import { Screens } from '../types';

import { Router } from '#infrastructure/router';

describe('SomeReportCoordinator', () => {
  const screensFactory = mock<ScreensFactory>();

  describe('init', () => {
    it('should register components on init', () => {
      // arrange
      const registeredComponents: Record<string, () => React.ComponentType> =
        {};
      const router = mock<Router>();
      router.registerComponent.mockImplementation((name, factory) => {
        registeredComponents[name] = factory;
      });
      const coordinator = new SomeReportFeatureCoordinatorImpl(
        router,
        screensFactory,
      );

      // act
      coordinator.init();

      // assert
      expect(registeredComponents).toEqual({
        [Screens.SomeReport]: screensFactory.createSomeReportScreen,
      });
    });

    it('should register components only once', () => {
      // arrange
      const router = mock<Router>();
      const coordinator = new SomeReportFeatureCoordinatorImpl(
        router,
        screensFactory,
      );

      // act
      coordinator.init();
      coordinator.init();

      // assert
      expect(router.registerComponent).toBeCalledTimes(1);
    });

    it('should return error if flow starts without init', () => {
      // arrange
      const router = mock<Router>();
      const coordinator = new SomeReportFeatureCoordinatorImpl(
        router,
        screensFactory,
      );

      // act
      const result = coordinator.startFlow({ onFlowCompleted: jest.fn() });

      // assert
      expect(result.isLeft()).toBeTruthy();
      expect(router.setStackRoot).not.toBeCalled();
    });

    it('should possible to start flow after init', () => {
      // arrange
      const router = mock<Router>();
      const coordinator = new SomeReportFeatureCoordinatorImpl(
        router,
        screensFactory,
      );

      // act
      coordinator.init();
      const result = coordinator.startFlow({ onFlowCompleted: jest.fn() });

      // assert
      expect(result.isRight()).toBeTruthy();
    });
  });

  describe('flows', () => {
    it('should set SomeReport screen as stack root after flow starts', () => {
      // arrange
      const router = mock<Router>();
      const coordinator = new SomeReportFeatureCoordinatorImpl(
        router,
        screensFactory,
      );
      const onFlowCompleted = jest.fn();

      // act
      coordinator.init();
      coordinator.startFlow({ onFlowCompleted });

      // assert
      expect(router.setStackRoot).toBeCalledWith(Screens.SomeReport, {
        onFinished: onFlowCompleted,
      });
    });
  });
});
