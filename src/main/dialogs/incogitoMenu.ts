/* Copyright (c) 2021-2022 SnailDOS */

import { BrowserWindow } from 'electron';
import { Application } from '../application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';

export const showIncognitoDialog = (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
) => {

  const menuWidth = 350;
  const dialog = Application.instance.dialogs.show({
    name: 'incognitoMenu',
    browserWindow,
    getBounds: () => ({
      width: menuWidth,
      height: 180,
      x: x - menuWidth + DIALOG_MARGIN,
      y: y - DIALOG_MARGIN_TOP,
    }),
    onWindowBoundsUpdate: () => {
      dialog.hide();
    },
  });
};
