import { BrowserWindow } from 'electron';
import { Application } from '../application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';
import { IBookmark } from '~/interfaces';
import { IDialog } from '~/main/services/dialogs-service';

export const showAddBookmarkDialog = async (
  browserWindow: BrowserWindow,
  x: number,
  y: number,
  data?: {
    url: string;
    title: string;
    color: string;
    bookmark?: IBookmark;
    favicon?: string;
  },
) => {
  if (!data) {
    const {
      url,
      title,
      color,
      bookmark,
      favicon,
    } = Application.instance.windows.current.viewManager.selected;
    data = {
      url,
      color,
      title,
      bookmark,
      favicon,
    };
  }

  const dialog: IDialog = await Application.instance.dialogs.show({
    name: 'add-bookmark',
    browserWindow,
    getBounds: () => ({
      width: 366,
      height: 300,
      x: x - 366 + DIALOG_MARGIN,
      y: y - DIALOG_MARGIN_TOP,
    }),
    onWindowBoundsUpdate: () => dialog.hide(),
  });
  if (!dialog) return;
  dialog.browserView.webContents.send('data', data);
};