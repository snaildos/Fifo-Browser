import { BrowserWindow } from 'electron';
import { Application } from '../application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';

export const showMenuExtraDialog = (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
) => {
  const tabId = Application.instance.windows.fromBrowserWindow(browserWindow)
    .viewManager.selectedId;
  const {
    url,
    title,
    bookmark,
    favicon
  } = Application.instance.windows.current.viewManager.selected;

  const menuWidth = 330;
  const dialog = Application.instance.dialogs.show({
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

  dialog.on('loaded', (e) => {
    e.reply('data', data);
  });

  dialog.handle('tab-id', () => tabId);
};
