/* Copyright (c) 2021-2022 SnailDOS */

import { promises as fs } from 'fs';
import { resolve, join } from 'path';
import fetch from 'node-fetch';

import { ElectronBlocker, Request } from '@cliqz/adblocker-electron';
import { getPath } from '~/utils';
import { Application } from '../application';
import { ipcMain } from 'electron';

export let engine: ElectronBlocker;

const PRELOAD_PATH = join(__dirname, './preload.js');

const loadFilters = async () => {
  const path = resolve(getPath('adblock/cache.dat'));
  engine = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch, {
    path: path,
    read: fs.readFile,
    write: fs.writeFile,
  });
};

const emitBlockedEvent = (request: Request) => {
  const win = Application.instance.windows.findByBrowserView(request.tabId);
  if (!win) return;
  win.viewManager.views.get(request.tabId).emitEvent('blocked-ad');
};

let adblockRunning = false;
let adblockInitialized = false;

export const runAdblockService = async (ses: Electron.Session) => {
  if (!adblockInitialized) {
    adblockInitialized = true;
    await loadFilters();
  }

  if (adblockInitialized && !engine) {
    return;
  }

  if (adblockRunning) return;

  adblockRunning = true;

  engine.enableBlockingInSession(ses);

  ipcMain.on('get-cosmetic-filters', (engine as any).onGetCosmeticFilters);
  ipcMain.on(
    'is-mutation-observer-enabled',
    (engine as any).onIsMutationObserverEnabled,
  );
  ses.setPreloads(ses.getPreloads().concat([PRELOAD_PATH]));

  engine.on('request-blocked', emitBlockedEvent);
  engine.on('request-redirected', emitBlockedEvent);
};

export const stopAdblockService = (ses: Electron.Session) => {
  if (!adblockRunning) return;

  adblockRunning = false;

  engine.disableBlockingInSession(ses);

  ses.setPreloads(ses.getPreloads().filter((p: string) => p !== PRELOAD_PATH));
};