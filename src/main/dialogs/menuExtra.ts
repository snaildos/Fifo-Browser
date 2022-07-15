/* Copyright (c) 2021-2022 SnailDOS */

import { BrowserWindow } from 'electron';
import { Application } from '../application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';

export const showMenuExtraDialog = async (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
) => {
  const tabId = await Application.instance.windows.fromBrowserWindow(browserWindow)
    .viewManager.selectedId;
  const {
    url,
    title,
    bookmark,
    favicon
  } = await Application.instance.windows.current.viewManager.selected;

  const menuWidth = 330;
  const dialog = await Application.instance.dialogs.show({
    name: 'menuExtra',
    browserWindow,
    getBounds: () => ({
      width: menuWidth,
      height: 510,
      x: x - menuWidth + DIALOG_MARGIN,
      y: y - DIALOG_MARGIN_TOP,
    }),
    onWindowBoundsUpdate: () => {
      dialog.hide();
    },
  });

  const data = {
    url,
    title,
    bookmark,
    favicon,
  };

  if (!dialog) return;
  dialog.browserView.webContents.send('data', data);

  dialog.handle('tab-id', () => tabId);
};
