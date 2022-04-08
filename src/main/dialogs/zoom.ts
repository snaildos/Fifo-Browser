import { BrowserWindow } from 'electron';
import { Application } from '../application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';
import {IDialog} from "~/main/services/dialogs-service";

export const showZoomDialog = async (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
) => {
  const tabId = Application.instance.windows.fromBrowserWindow(browserWindow)
    .viewManager.selectedId;

  const dialog: IDialog = await Application.instance.dialogs.show({
    name: 'zoom',
    browserWindow,
    getBounds: () => ({
      width: 280,
      height: 100,
      x: x - 280 + DIALOG_MARGIN,
      y: y - DIALOG_MARGIN_TOP,
    }),
    onWindowBoundsUpdate: () => dialog.hide(),
  });

  if (!dialog) return;

  dialog.handle('tab-id', () => tabId);
};