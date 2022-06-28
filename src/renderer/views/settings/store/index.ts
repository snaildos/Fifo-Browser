/* Copyright (c) 2021-2022 SnailDOS */

import { observable, computed, makeObservable } from 'mobx';
import * as React from 'react';
import { ISettings, ITheme, ISearchEngine } from '~/interfaces';
import { AutoFillStore } from './autofill';
import { StartupTabsStore } from './startup-tabs';
import { getTheme } from '~/utils/themes';
import { Textfield } from '~/renderer/components/Textfield';

export type SettingsSection =
  | 'appearance'
  | 'autofill'
  | 'address-bar'
  | 'privacy'
  | 'permissions'
  | 'startup'
  | 'language'
  | 'shortcuts'
  | 'downloads'
  | 'system'
  | 'search-engines'

export class Store {
  public autoFill = new AutoFillStore();
  public startupTabs = new StartupTabsStore();

  public menuRef = React.createRef<HTMLDivElement>();

  public dialogRef = React.createRef<HTMLDivElement>();

  public searchEngineInputRef = React.createRef<Textfield>();
  public searchEngineKeywordInputRef = React.createRef<Textfield>();
  public searchEngineUrlInputRef = React.createRef<Textfield>();

  public menuInfo = {
    left: 0,
    top: 0,
  };

  private _menuVisible = false;
  sections: any;

  public get menuVisible() {
    return this._menuVisible;
  }

  public set menuVisible(value: boolean) {
    this._menuVisible = value;

    if (value) {
      this.menuRef.current.focus();
    }
  }

  public dialogVisible = false;

  public dialogContent:
    | 'edit-search-engine'
    | 'add-search-engine'
    | 'edit-address'
    | 'edit-password'
    | 'privacy' = null;

  
  public selectedSection: SettingsSection = 'appearance';

  public settings: ISettings = { ...(window as any).settings };

  public editedSearchEngine: ISearchEngine = null;

  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  public get searchEngine() {
    return this.settings.searchEngines[this.settings.searchEngine];
  }

  constructor() {
    makeObservable<Store, '_menuVisible'>(this, {
      menuInfo: observable,
      _menuVisible: observable,
      menuVisible: computed,
      dialogVisible: observable,
      dialogContent: observable,
      selectedSection: observable,
      settings: observable,
      editedSearchEngine: observable,
      theme: computed,
      searchEngine: computed,
    });

    (window as any).updateSettings = (settings: ISettings) => {
      this.settings = { ...this.settings, ...settings };
    };

    window.onmousedown = () => {
      this.autoFill.menuVisible = false;
    };
  }

  public save() {
    delete this.settings.darkContents;
    delete this.settings.multrin;
    delete this.settings.shield;

    window.postMessage(
      {
        type: 'save-settings',
        data: JSON.stringify(this.settings),
      },
      '*',
    );
  }
}

export default new Store();