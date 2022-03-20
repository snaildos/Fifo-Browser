/* Copyright (c) 2021-2022 SnailDOS */

import * as remote from '@electron/remote';

export const getCurrentWindow = () => remote.getCurrentWindow();

export const closeWindow = () => {
  getCurrentWindow().close();
};

export const minimizeWindow = () => {
  getCurrentWindow().minimize();
};

export const maximizeWindow = () => {
  const currentWindow = getCurrentWindow();

  if (currentWindow.isMaximized()) {
    currentWindow.unmaximize();
  } else {
    currentWindow.maximize();
  }
};
