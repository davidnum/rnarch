import { mock, mockDeep } from 'jest-mock-extended';

import { Coordinator } from '#apps/com.some.app/coordinator';
import { Features } from '#apps/com.some.app/features';
import { Logger } from '#infrastructure/logger';
import { Router } from '#infrastructure/router';

describe('Coordinator', () => {
  it('should start splash feature', () => {
    // arrange
    const router = mock<Router>();
    const logger = mock<Logger>();
    const features = mockDeep<Features>();

    const coordinator = new Coordinator(router, features, logger);

    // act
    coordinator.start();

    // assert
    // expect(features.splash.coordinator.startFlow).toBeCalled();
  });
});
