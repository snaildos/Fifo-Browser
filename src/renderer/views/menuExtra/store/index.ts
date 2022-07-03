/* Copyright (c) 2021-2022 SnailDOS */

import { ipcRenderer, remote } from 'electron';
import { makeObservable, observable } from 'mobx';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {

  public data = {};

  public constructor() {
    super();

    makeObservable(this, {
      
    });

    // this.init();

    ipcRenderer.on('data', (e: any, _data: any) => {
      const { url, title, bookmark, favicon, browserWindow } = _data;
      this.data = {
        url,
        title,
        bookmark,
        favicon,
      };
    });
  }

  public async capturePage() {
    return await remote.getCurrentWindow().capturePage().then((img: { toDataURL: () => any; }) => {
      return img.toDataURL()
    })
  }

  // public async init() {  }

  public async save() {
    ipcRenderer.send('save-settings', {
      settings: JSON.stringify(this.settings),
    });
  }
}

export default new Store();
