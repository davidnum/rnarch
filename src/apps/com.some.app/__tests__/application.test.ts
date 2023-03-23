import { mock } from 'jest-mock-extended';

import { Application } from '#apps/com.some.app/application';
import { Coordinator } from '#apps/com.some.app/coordinator';

describe('Application', () => {
  it('should bootstrap router and start coordinator', async () => {
    const coordinator = mock<Coordinator>();

    // arrange
    const app = new Application(coordinator);

    // act
    await app.start();

    // assert
    expect(coordinator.start).toBeCalled();
  });
});
