/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { 
  StyledApp,
  MenuItem,
  MenuItems,
  Content,
  Icon,
  MenuItemTitle,
  Text,
  MenuItemIcon,
} from './style';
import { UIStyle } from '~/renderer/mixins/default-styles';
import store from '../../store';
import {
  ICON_INCOGNITO,
  ICON_CLOSE,
} from '~/renderer/constants/icons';
import { ipcRenderer, remote } from 'electron';

const onClick = () => {
  ipcRenderer.send(`window-close-${store.windowId}`);
}

export const App = observer(() => {
  return (
    <ThemeProvider
      theme={{ ...store.theme, dark: store.theme['dialog.lightForeground'] }}
    >
      <StyledApp style={{marginRight: '85px', marginTop: '5px'}}>
        <UIStyle />
          <Content>
            <Icon icon={ICON_INCOGNITO} />
            <Text>
            You are in Incognito mode
            </Text>
          </Content>
          <MenuItems>
            <MenuItem>
              <MenuItemIcon icon={ICON_CLOSE} />
              <MenuItemTitle onClick={onClick}>
                Leave Incognito Mode!
              </MenuItemTitle>
            </MenuItem>
          </MenuItems>
      </StyledApp>
    </ThemeProvider>
  );
});
