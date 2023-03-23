import { observer } from 'mobx-react-lite';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  SomeReportScreenViewActions,
  SomeReportScreenViewState,
} from './some-report-screen.types';

interface Props {
  readonly state: SomeReportScreenViewState;
  readonly actions: SomeReportScreenViewActions;
}

export const SomeReportScreen = observer<Props>(({ actions, state }) => {
  if (state.isLoading) {
    return <Text>Loading</Text>;
  }

  if (state.hasError) {
    return <Text>Error</Text>;
  }

  return (
    <View>
      <Text>{state.text}</Text>

      <Pressable onPress={actions.finish}>
        <Text>Finish</Text>
      </Pressable>
    </View>
  );
});

SomeReportScreen.displayName = 'SomeReportScreen';
