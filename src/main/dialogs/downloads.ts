/* Copyright (c) 2021-2022 SnailDOS */

import { BrowserWindow } from 'electron';
import { Application } from '../application';
import {
  DIALOG_MARGIN_TOP,
  DIALOG_MARGIN,
  DIALOG_TOP,
} from '~/constants/design';
import { IDialog } from '~/main/services/dialogs-service';

export const showDownloadsDialog = async (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
) => {
  let height = 64 * 8;

  const dialog: IDialog = await Application.instance.dialogs.show({
    name: 'downloads-dialog',
    browserWindow,
    getBounds: (dialog) => {
      const winBounds = browserWindow.getContentBounds();
      const maxHeight = winBounds.height - DIALOG_TOP - 16;

      height = Math.round(Math.min(winBounds.height, height + 28));

      dialog.browserView.webContents.send(
        `max-height`,
        Math.min(maxHeight, height),
      );

      return {
        x: x - 350 + DIALOG_MARGIN,
        y: y - DIALOG_MARGIN_TOP,
        width: 350,
        height,
      };
    },
    onWindowBoundsUpdate: () => dialog.hide(),
  });

  if (!dialog) return;

  dialog.on('height', (e, h) => {
    height = h;
    dialog.rearrange();
  });
};