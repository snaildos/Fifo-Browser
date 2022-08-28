/* Copyright (c) 2021-2022 SnailDOS */

import { observable, computed } from 'mobx';
import { ISettings, IFavicon, ITheme, IBookmark } from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { PreloadDatabase } from '~/preloads/models/database';
import { ipcRenderer } from 'electron';
import * as React from 'react';
import { Textfield } from '~/renderer/components/Textfield';

export class Store {
  public faviconsDb = new PreloadDatabase<IFavicon>('favicons');

  public nameInputRef = React.createRef<Textfield>();

  public urlInputRef = React.createRef<Textfield>();

  @observable
  public settings: ISettings = { ...(window as any).settings };

  @observable
  public list: IBookmark[] = [];

  @observable
  public menuLeft = 0;

  @observable
  public menuTop = 0;

  @observable
  public menuVisible = false;

  @observable
  public changelog = '';

  @observable
  public searched = '';

  @observable
  public selectedItems: string[] = [];

  @observable
  public favicons: Map<string, string> = new Map();

  @observable
  public currentFolder: string = null;

  @computed
  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  public async load() {
    const items: IBookmark[] = await ipcRenderer.invoke('bookmarks-get');
    this.list = items.map((x) => ({ ...x }));
    this.currentFolder = this.list.find((x) => x.static === 'main')._id;
  }

  public async loadFavicons() {
    (await this.faviconsDb.get({})).forEach((favicon) => {
      const { data } = favicon;

      if (this.favicons.get(favicon.url) == null) {
        this.favicons.set(favicon.url, data);
      }
    });
  }

  public async save() {
    try {
      ipcRenderer.send('save-settings', {
        settings: JSON.stringify(this.settings),
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default new Store();
