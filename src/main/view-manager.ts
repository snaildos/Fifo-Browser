/* Copyright (c) 2021-2022 SnailDOS */

import { dialog, ipcMain } from 'electron';
import { View } from './view';
import { AppWindow } from './windows';
import { WEBUI_BASE_URL } from '~/constants/files';

import {
  ZOOM_FACTOR_MIN,
  ZOOM_FACTOR_MAX,
  ZOOM_FACTOR_INCREMENT,
} from '~/constants/web-contents';
import { EventEmitter } from 'events';
import { Application } from './application';

export class ViewManager extends EventEmitter {
  public views = new Map<number, View>();
  public selectedId = 0;
  public _fullscreen = false;

  public incognito: boolean;

  private readonly window: AppWindow;

  public get fullscreen() {
    return this._fullscreen;
  }

  public set fullscreen(val: boolean) {
    this._fullscreen = val;
    this.fixBounds();
  }

  public constructor(window: AppWindow, incognito: boolean) {
    super();

    this.window = window;
    this.incognito = incognito;

    const { id } = window.win;
    ipcMain.handle(`view-create-${id}`, (e, details) => {
      return this.create(details, false, false).id;
    });

    ipcMain.handle(`views-create-${id}`, (e, options) => {
      return options.map((option: any) => {
        return this.create(option, false, false).id;
      });
    });

    ipcMain.on(`add-tab-${id}`, (e, details) => {
      this.create(details);
    });

    ipcMain.on('create-tab-menu-extra', (e, details: any) => {
      this.create(details);
    });

    ipcMain.on('save-as-menu-extra', async (e) => {
      const {
        title,
        webContents,
      } = Application.instance.windows.current.viewManager.selected;
    
      const { canceled, filePath } = await dialog.showSaveDialog({
        defaultPath: title,
        filters: [
          { name: 'Webpage, Complete', extensions: ['html', 'htm'] },
          { name: 'Webpage, HTML Only', extensions: ['htm', 'html'] },
        ],
      });
    
      if (canceled) return;
    
      const ext = extname(filePath);
    
      await webContents.savePage(filePath, ext === '.htm' ? 'HTMLOnly' : 'HTMLComplete');
    });

    ipcMain.on('Print', () => {
      this.selected.webContents.print();
    });

    ipcMain.handle(
      `view-select-${id}`,
      async (e, id: number, focus: boolean) => {
        await this.select(id, focus);
      },
    );

    ipcMain.removeHandler('get-tab-zoom')
    ipcMain.handle('get-tab-zoom', (e: any, tabId: number) => {
      // const zoom = this.findByBrowserView(tabId).viewManager.views.get(tabId)
      //  .webContents.zoomFactor;
      return this.selected.webContents.zoomFactor;
    });

    ipcMain.on(`view-destroy-${id}`, (e, id: number) => {
      this.destroy(id);
    });

    ipcMain.on(`mute-view-${id}`, (e, tabId: number) => {
      const view = this.views.get(tabId);
      view.webContents.setAudioMuted(true);
    });

    ipcMain.on(`unmute-view-${id}`, (e, tabId: number) => {
      const view = this.views.get(tabId);
      view.webContents.setAudioMuted(false);
    });

    ipcMain.on(`browserview-clear-${id}`, () => {
      this.clear();
    });

    ipcMain.on('change-zoom', (e, zoomDirection) => {
      const newZoomFactor =
        this.selected.webContents.zoomFactor +
        (zoomDirection === 'in'
          ? ZOOM_FACTOR_INCREMENT
          : -ZOOM_FACTOR_INCREMENT);

      if (
        newZoomFactor <= ZOOM_FACTOR_MAX &&
        newZoomFactor >= ZOOM_FACTOR_MIN
      ) {
        this.selected.webContents.zoomFactor = newZoomFactor;
        this.selected.emitEvent(
          'zoom-updated',
          this.selected.webContents.zoomFactor,
        );
      } else {
        e.preventDefault();
      }
      this.emitZoomUpdate();
    });

    ipcMain.on('change-zoom-menu', (e, zoomDirection) => {
      const newZoomFactor =
        this.selected.webContents.zoomFactor +
        (zoomDirection === 'in'
          ? ZOOM_FACTOR_INCREMENT
          : -ZOOM_FACTOR_INCREMENT);

      if (
        newZoomFactor <= ZOOM_FACTOR_MAX &&
        newZoomFactor >= ZOOM_FACTOR_MIN
      ) {
        this.selected.webContents.zoomFactor = newZoomFactor;
        this.selected.emitEvent(
          'zoom-updated',
          this.selected.webContents.zoomFactor,
        );
      } else {
        e.preventDefault();
      }
      this.emitZoomUpdate(false);
    });

    ipcMain.on('reset-zoom', (e) => {
      this.selected.webContents.zoomFactor = 1;
      this.selected.emitEvent(
        'zoom-updated',
        this.selected.webContents.zoomFactor,
      );
      this.emitZoomUpdate();
    });

    this.setBoundsListener();
  }

  public get selected() {
    return this.views.get(this.selectedId);
  }

  public get settingsView() {
    return Object.values(this.views).find((r) =>
      r.url.startsWith(`${WEBUI_BASE_URL}settings`),
    );
  }

  public create(
    details: chrome.tabs.CreateProperties,
    isNext = false,
    sendMessage = true,
  ) {
    const view = new View(this.window, details.url, this.incognito);

    const { webContents } = view.browserView;
    const { id } = view;

    this.views.set(id, view);

    if (process.env.ENABLE_EXTENSIONS) {
      Application.instance.sessions.chromeExtensions.addTab(
        webContents,
        this.window.win,
      );

      if (details.active) {
        Application.instance.sessions.chromeExtensions.selectTab(webContents);
      }
    }

    webContents.once('destroyed', () => {
      this.views.delete(id);
    });

    if (sendMessage) {
      this.window.send('create-tab', { ...details }, isNext, id);
    }
    return view;
  }

  public clear() {
    this.window.win.setBrowserView(null);
    Object.values(this.views).forEach((x) => x.destroy());
  }

  public async select(id: number, focus = true) {
    console.trace();
    const { selected } = this;
    const view = this.views.get(id);
    if (!view) {
      return;
    }
    this.selectedId = id;

    if (selected) {
      this.window.win.removeBrowserView(selected.browserView);
    }

    this.window.win.addBrowserView(view.browserView);

    if (focus) {
      // Also fixes switching tabs with Ctrl + Tab
      view.webContents.focus();
    } else {
      this.window.webContents.focus();
    }

    this.window.updateTitle();
    view.updateBookmark();

    await this.fixBounds();

    view.updateNavigationState();

    Application.instance.sessions.chromeExtensions.selectTab(view.webContents);
    this.emit('activated', id);

    // TODO: this.emitZoomUpdate(false);
  }

  public changeZoom(zoomDirection: 'in' | 'out', e?: any) {
    const newZoomFactor =
        this.selected.webContents.zoomFactor +
        (zoomDirection === 'in'
          ? ZOOM_FACTOR_INCREMENT
          : -ZOOM_FACTOR_INCREMENT);

      if (
        newZoomFactor <= ZOOM_FACTOR_MAX &&
        newZoomFactor >= ZOOM_FACTOR_MIN
      ) {
        this.selected.webContents.zoomFactor = newZoomFactor;
        this.selected.emitEvent(
          'zoom-updated',
          this.selected.webContents.zoomFactor,
        );
      } else {
        e?.preventDefault();
      }
      this.emitZoomUpdate();
  } 

  public async fixBounds() {
    const view = this.selected;

    if (!view) return;

    const { width, height } = this.window.win.getContentBounds();

    const toolbarContentHeight = await this.window.win.webContents
      .executeJavaScript(`
      document.getElementById('app').offsetHeight
    `);

    const newBounds = {
      x: 0,
      y: this.fullscreen ? 0 : toolbarContentHeight,
      width,
      height: this.fullscreen ? height : height - toolbarContentHeight,
    };

    if (newBounds !== view.bounds) {
      view.browserView.setBounds(newBounds);
      view.bounds = newBounds;
    }
  }

  private async setBoundsListener() {
    // resize the BrowserView's height when the toolbar height changes
    // ex: when the bookmarks bar appears
    await this.window.webContents.executeJavaScript(`
        const {ipcRenderer} = require('electron');
        const resizeObserver = new ResizeObserver(([{ contentRect }]) => {
          ipcRenderer.send('resize-height');
        });
        const app = document.getElementById('app');
        resizeObserver.observe(app);
      `);

    this.window.webContents.on('ipc-message', (e, message) => {
      if (message === 'resize-height') {
        this.fixBounds();
      }
    });
  }

  public destroy(id: number) {
    const view = this.views.get(id);

    this.views.delete(id);

    if (view && !view.browserView.webContents.isDestroyed()) {
      this.window.win.removeBrowserView(view.browserView);
      view.destroy();
      this.emit('removed', id);
    }
  }

  public emitZoomUpdate(showDialog = true) {
    Application.instance.dialogs
      .getDynamic('zoom')
      ?.browserView?.webContents?.send(
        'zoom-factor-updated',
        this.selected.webContents.zoomFactor,
      );

    this.window.webContents.send(
      'zoom-factor-updated',
      this.selected.webContents.zoomFactor,
      showDialog,
    );
  }
}