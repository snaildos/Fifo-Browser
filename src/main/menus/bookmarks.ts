/* Copyright (c) 2021-2022 SnailDOS */

import {
  Menu,
  nativeImage,
  NativeImage,
  MenuItemConstructorOptions,
} from 'electron';
import { IBookmark } from '~/interfaces';
import { Application } from '../application';
import { AppWindow } from '../windows/app';
import { showAddBookmarkDialog } from '../dialogs/add-bookmark';

function getIcon(
  favicon: string | undefined
): NativeImage | string {
  if (favicon) {
    let dataURL = Application.instance.storage.favicons.get(favicon);
    if (dataURL) {
      // some favicon data urls have a corrupted base 64 file type descriptor
      // prefixed with data:png;base64, instead of data:image/png;base64,
      // see: https://github.com/electron/electron/issues/23369
      if (!dataURL.split(',')[0].includes('image')) {
        const split = dataURL.split(':');
        dataURL = split.join(':image/');
      }

      return nativeImage
        .createFromDataURL(dataURL)
        .resize({ width: 16, height: 16 });
    }
  }
  return undefined
}

export function createDropdown(
  appWindow: AppWindow,
  parentID: string,
  bookmarks: IBookmark[],
): Electron.Menu {
  const folderBookmarks = bookmarks.filter(
    ({ static: staticName, parent }) => !staticName && parent === parentID,
  );
  const template = folderBookmarks.map<MenuItemConstructorOptions>(
    ({ title, url, favicon, isFolder, _id }) => ({
      click: url
        ? () => {
            appWindow.viewManager.create({ url, active: true });
          }
        : undefined,
      label: title,
      icon: getIcon(favicon),
      submenu: isFolder ? createDropdown(appWindow, _id, bookmarks) : undefined,
      id: _id,
    }),
  );

  return template.length > 0
    ? Menu.buildFromTemplate(template)
    : Menu.buildFromTemplate([{ label: '(empty)', enabled: false }]);
}

export function createMenu(appWindow: AppWindow, item: IBookmark) {
  const { isFolder, url } = item;
  const folderItems: MenuItemConstructorOptions[] = [
    {
      label: 'Open in New Tab',
      click: () => {
        appWindow.viewManager.create({ url, active: true });
      },
    },
    {
      type: 'separator',
    },
  ];

  const template: MenuItemConstructorOptions[] = [
    ...(!isFolder ? folderItems : []),
    {
      label: 'Edit',
      click: () => {
        const windowBounds = appWindow.win.getBounds();
        showAddBookmarkDialog(appWindow.win, windowBounds.width - 20, 72, {
          url: item.url,
          title: item.title,
          bookmark: item,
          favicon: item.favicon,
          color: ''
        });
      },
    },
    {
      label: 'Delete',
      click: async () => {
        await Application.instance.storage.removeBookmark(item._id);
      },
    },
  ];

  return Menu.buildFromTemplate(template);
}
