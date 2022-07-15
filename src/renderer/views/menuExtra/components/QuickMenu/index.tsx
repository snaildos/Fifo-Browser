/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import {
  Line,
  MenuItem,
  MenuItems,
  Content,
  Icon,
  MenuItemTitle,
  Shortcut,
  RightControl,
} from './style';
import store from '../../store';
import { ipcRenderer, remote, shell } from 'electron';
import * as copy from 'copy-to-clipboard';
// import { WEBUI_BASE_URL, WEBUI_URL_SUFFIX } from '~/constants/files';
import {
  ICON_FIRE,
  ICON_TOPMOST,
  ICON_TAB,
  ICON_WINDOW,
  ICON_CAPTURE,
  ICON_SHARE,
  ICON_LINK,
  ICON_SETTINGS,
  ICON_VOLUME_HIGH,
  ICON_DOWNLOAD,
  ICON_FIND,
  ICON_PRINT,
} from '~/renderer/constants/icons';
import { getWebUIURL } from '~/common/webui';
// import { saveAs } from '~/main/menus/common-actions';

const onPrintClick = () => {
  ipcRenderer.send('Print', null);
  store.hide();
};

const onFindInPageClick = () => {
  ipcRenderer.send(`find-in-page-${store.windowId}`);
  store.hide();
};

const addNewTab = (url: string) => {
  ipcRenderer.send(`add-tab-${store.windowId}`, {
    url,
    active: true,
  });
  store.hide();
};

const goToWebUIPage = (name: string) => () => {
  addNewTab(getWebUIURL(name));
};

const goToURL = (url: string) => () => {
  addNewTab(url);
};

const onDuplicateTab = () => {
  ipcRenderer.send(`add-tab-${store.windowId}`, {
    url: store.data.url,
    active: true,
  });
};

const guardarComo = () => {
  //saveAs();
  ipcRenderer.send('save-as-menu-extra');
};

const copiarUrl = async () => {
  await copy(store.data.url);
  store.hide()
}

const shareUrl = () => {
  
  shell.openExternal('mailto:?subject=Shared From Fifo Browser&body='+store.data.url)
}

const capture = async () => {
  copy(await store.capturePage())
}

export const QuickMenu = observer(() => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'column',
      }}
    >
      <Content>
        <MenuItems>
          <MenuItem style={{ cursor: 'pointer' }} onClick={onDuplicateTab}>
            <Icon icon={ICON_TAB} />
            <MenuItemTitle>Duplicate tab</MenuItemTitle>
          </MenuItem>
          <Line />
          <MenuItem style={{ cursor: 'pointer' }} onClick={copiarUrl}>
            <Icon icon={ICON_LINK} />
            <MenuItemTitle>Copy link</MenuItemTitle>
          </MenuItem>
          <MenuItem style={{ cursor: 'pointer' }} onClick={shareUrl}>
            <Icon icon={ICON_SHARE} />
            <MenuItemTitle>Share</MenuItemTitle>
          </MenuItem>
          <Line />
          <MenuItem style={{ cursor: 'pointer' }} onClick={guardarComo}>
            <Icon icon={ICON_DOWNLOAD} />
            <MenuItemTitle>Save as</MenuItemTitle>
            <Shortcut>Ctrl+S</Shortcut>
          </MenuItem>
          <Line />
          <MenuItem disabled style={{ cursor: 'pointer' }}>
            <Icon icon={ICON_VOLUME_HIGH} />
            <MenuItemTitle>Read out loud</MenuItemTitle>
          </MenuItem>
          <Line />
          <MenuItem style={{ cursor: 'pointer' }} onClick={onFindInPageClick}>
            <Icon icon={ICON_FIND} />
            <MenuItemTitle>Find on the page</MenuItemTitle>
            <Shortcut>Ctrl+F</Shortcut>
          </MenuItem>
          <MenuItem style={{ cursor: 'pointer' }} onClick={onPrintClick}>
            <Icon icon={ICON_PRINT} />
            <MenuItemTitle>Print</MenuItemTitle>
            <Shortcut>Ctrl+P</Shortcut>
          </MenuItem>
        </MenuItems>
      </Content>
    </div>
  );
});
