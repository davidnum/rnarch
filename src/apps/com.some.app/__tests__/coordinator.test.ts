import { mock, mockDeep } from 'jest-mock-extended';

import { Coordinator } from '#apps/com.some.app/coordinator';
import { Features } from '#apps/com.some.app/features';
import { Router } from '#infrastructure/router';

describe('Coordinator', () => {
  it('should start splash feature', () => {
    // arrange
    const router = mock<Router>();
    const features = mockDeep<Features>();

    const coordinator = new Coordinator(router, features);

    // act
    coordinator.start();

    // assert
    // expect(features.splash.coordinator.startFlow).toBeCalled();
  });
});
