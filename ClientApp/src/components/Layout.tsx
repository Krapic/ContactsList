import { ScrollablePane, Stack } from '@fluentui/react';
import React from 'react';
import NavMenu from './NavMenu';

export interface ILayoutProps {
  children?: React.ReactNode;
}

export default function Layout(props: ILayoutProps) {
  return (
    <Stack styles={{ root: { height: '100vh' } }}>
      <NavMenu />

      <ScrollablePane styles={{ root:  {position: 'relative', flex: 1 } }}>
        {props.children}
      </ScrollablePane>
    </Stack>
  );
}
