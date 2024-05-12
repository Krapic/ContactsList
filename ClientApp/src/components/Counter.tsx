import { getTheme, PrimaryButton, Stack, Text } from '@fluentui/react';
import React, { useState } from 'react';

const theme = getTheme();

export default function Counter() {
  const [count, setCount] = useState(0);

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  return (
    <Stack styles={{ root: { padding: theme.spacing.m } }}>
      <Text variant='xLarge'>Counter: {count}</Text>

      <Stack horizontal tokens={{ childrenGap: theme.spacing.m }}>
        <PrimaryButton onClick={decrement}>Decrement</PrimaryButton>
        <PrimaryButton onClick={increment}>Increment</PrimaryButton>
      </Stack>
    </Stack>
  );
}
