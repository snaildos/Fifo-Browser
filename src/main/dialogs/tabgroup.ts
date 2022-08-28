/* Copyright (c) 2021-2022 SnailDOS */

import { BrowserWindow } from 'electron';
import { Application } from '../application';
import { DIALOG_MARGIN_TOP, DIALOG_MARGIN } from '~/constants/design';

export const showTabGroupDialog = async (
  browserWindow: BrowserWindow,
  tabGroup: any,
) => {
  const dialog = Application.instance.dialogs.show({
    name: 'tabgroup',
    browserWindow,
    getBounds: () => ({
      width: 266,
      height: 180,
      x: tabGroup.x - DIALOG_MARGIN,
      y: tabGroup.y - DIALOG_MARGIN_TOP,
    }),
    onWindowBoundsUpdate: async () => (await dialog).hide(),
  });

  if (!dialog) return;

  (await dialog).handle('tabgroup', () => tabGroup);
};
