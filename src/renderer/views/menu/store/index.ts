/* Copyright (c) 2021-2022 SnailDOS */

import { ipcRenderer } from 'electron';
import * as remote from '@electron/remote';
import { makeObservable, observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {
  public alwaysOnTop = false;

  public updateAvailable = false;

  @observable
  public zoomFactor = 1;

  public constructor() {
    super();

    makeObservable(this, {
      alwaysOnTop: observable,
      updateAvailable: observable,
      zoomFactor: observable,
    });

    this.init();

    ipcRenderer.on('update-available', () => {
      this.updateAvailable = true;
    });
  }

  public async init() {
    if (remote.getCurrentWindow()) {
      this.alwaysOnTop = remote.getCurrentWindow().isAlwaysOnTop();
    }

    this.updateAvailable = await ipcRenderer.invoke('is-update-available');

    const tabId = await ipcRenderer.sendSync('get-webcontents-id');
    this.zoomFactor = await ipcRenderer.invoke('get-tab-zoom', tabId);
  }

  public async save() {
    ipcRenderer.send('save-settings', {
      settings: JSON.stringify(this.settings),
    });
  }
}

export default new Store();
