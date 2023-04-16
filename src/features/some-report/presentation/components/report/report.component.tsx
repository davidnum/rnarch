import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ReportProps {
  text: string;
}

export const Report = observer<ReportProps>(({ text }) => {
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
});

const styles = StyleSheet.create({});

Report.displayName = 'Report';
