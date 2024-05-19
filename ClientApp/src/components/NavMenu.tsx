import React from 'react';
import { Link } from 'react-router-dom';
import { getTheme, Stack } from '@fluentui/react';

const theme = getTheme();

const linkStyle = { 
  textDecoration: 'none', 
  color: theme.palette.themePrimary 
};

export default function NavMenu() {
  return (
    <Stack 
      horizontal
      horizontalAlign='space-between'
      verticalAlign='center'
      styles={{
        root: {
          height: 50,
          borderBottomColor: theme.palette.neutralLight,
          borderBottomStyle: 'solid',
          borderBottomWidth: 1,
          paddingLeft: theme.spacing.m,
          paddingRight: theme.spacing.m,
        }
      }}
    >
      <Link to='/' style={linkStyle}>Adresar</Link>
    </Stack>
  );
}
