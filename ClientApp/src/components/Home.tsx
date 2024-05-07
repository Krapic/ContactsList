import React from 'react';
import { getTheme, Stack, Text } from '@fluentui/react';

const theme = getTheme();

export default function Home() {
  return (
    <Stack styles={{ root: { padding: theme.spacing.m } }}>
      <Text variant='xLarge'>Hello, world!</Text>
    </Stack>
  );
}
