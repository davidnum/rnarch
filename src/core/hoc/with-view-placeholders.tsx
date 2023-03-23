import { observer } from 'mobx-react-lite';
import React from 'react';

export const withViewPlaceholders =
  <ViewPlaceholders,>() =>
  (
    Component: React.FunctionComponent<{
      placeholders: ViewPlaceholders;
    }>,
  ) => {
    const wrappedComponent = observer(
      (props: { placeholders: ViewPlaceholders }) => {
        return <Component {...props} />;
      },
    );

    wrappedComponent.displayName = `withViewPlaceholders(${Component.displayName})`;
    return wrappedComponent;
  };
