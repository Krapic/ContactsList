import * as React from 'react';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 650 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 300 } },
};

interface TextFieldProps {
    value: string;
    onChange: (value: string) => void;
  }

  export const TextFieldBasicExample: React.FunctionComponent<TextFieldProps> = ({ value, onChange }) => {
  return (
    <form noValidate autoComplete="off">
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
            <TextField value={value} onChange={(e, newValue) => onChange(newValue || '')} />
        </Stack>
      </Stack>
    </form>
  );
};
