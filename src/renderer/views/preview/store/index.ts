/* Copyright (c) 2021-2022 SnailDOS */

import { ipcRenderer } from 'electron';
import { observable, computed, makeObservable } from 'mobx';
import { WEBUI_BASE_URL, WEBUI_PROTOCOL } from '~/constants/files';
import { DialogStore } from '~/models/dialog-store';

export class Store extends DialogStore {
  private timeout: any;
  private timeout1: any;

  // Observable

  public title = '';

  public url = '';

  public x = 0;

  public xTransition = false;

  // Computed

  public get domain() {
    const parsed = new URL(this.url);
    if (
      WEBUI_BASE_URL.startsWith(WEBUI_PROTOCOL) &&
      this.url.startsWith(WEBUI_BASE_URL)
    ) {
      return parsed.protocol + '//' + parsed.hostname;
    }

    if (parsed.protocol === 'file:') {
      return 'local or shared file';
    }

    if (parsed.protocol === 'http:') {
      return 'Unsecure Website';
    }
    
    return parsed.hostname;
  }

  constructor() {
    super({ visibilityWrapper: false, persistent: true });

    makeObservable(this, {
      title: observable,
      url: observable,
      x: observable,
      xTransition: observable,
      domain: computed,
    });

    ipcRenderer.on('visible', (e, visible, tab) => {
      clearTimeout(this.timeout);
      clearTimeout(this.timeout1);

      if (!visible) {
        this.visible = false;
      }

      if (visible) {
        this.timeout1 = setTimeout(() => {
          this.xTransition = true;
        }, 80);
      } else if (!visible) {
        this.timeout = setTimeout(() => {
          this.xTransition = false;
        }, 100);
      }

      if (tab) {
        this.title = tab.title;
        this.url = tab.url;
        this.x = tab.x;

        if (visible && this.title !== '' && this.url !== '') {
          this.visible = visible;
        }
      }
    });
  }
}

export default new Store();