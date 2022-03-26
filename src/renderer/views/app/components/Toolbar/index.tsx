/* Copyright (c) 2021-2022 SnailDOS */

import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { StyledToolbar } from './style';
import { NavigationButtons } from '../NavigationButtons';

import { AddressBar } from '../AddressBar';
import { RightButtons } from '../RightButtons';
import store from '../../store';
import { platform } from 'os';
import { FullscreenExitButton } from '../Titlebar/style';
import { ipcRenderer } from 'electron';
import * as remote from '@electron/remote';
import { WindowsControls } from 'react-windows-controls';

const onFullscreenExit = (e: React.MouseEvent<HTMLDivElement>) => {
  remote.getCurrentWindow().setFullScreen(false);
};

const onCloseClick = () => ipcRenderer.send(`window-close-${store.windowId}`);
const onMaximizeClick = () =>
  ipcRenderer.send(`window-toggle-maximize-${store.windowId}`);
const onMinimizeClick = () =>
  ipcRenderer.send(`window-minimize-${store.windowId}`);
const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  if (store.addressbarFocused) {
    e.preventDefault();
  }
};

export const Toolbar = observer(() => {
  return (
    <StyledToolbar>
      <NavigationButtons />
      <AddressBar />
      <RightButtons />
    </StyledToolbar>
  );
});
