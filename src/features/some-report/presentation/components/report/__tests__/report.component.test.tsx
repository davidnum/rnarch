import { render } from '@testing-library/react-native';
import React from 'react';

import { Report } from '#features/some-report/presentation/components';

describe('Report component', () => {
  it('should render provide text', async () => {
    // arrange
    const view = render(<Report text="Report" />);

    // assert
    expect(await view.findByText('Report')).toBeVisible();
  });
});
