/* Copyright (c) 2021-2022 SnailDOS */

import { BrowserView, app, ipcMain } from 'electron';
import { URL } from 'url';
import { getViewMenu } from './menus/view';
import { AppWindow } from './windows';
import { IHistoryItem, IBookmark } from '~/interfaces';
import {
  ERROR_PROTOCOL,
  NETWORK_ERROR_HOST,
  WEBUI_BASE_URL,
} from '~/constants/files';
import { NEWTAB_URL } from '~/constants/tabs';
import {
  ZOOM_FACTOR_MIN,
  ZOOM_FACTOR_MAX,
  ZOOM_FACTOR_INCREMENT,
} from '~/constants/web-contents';
import { TabEvent } from '~/interfaces/tabs';
import { Queue } from '~/utils/queue';
import { Application } from './application';
import { getUserAgentForURL } from './user-agent';

interface IAuthInfo {
  url: string;
}

export class View {
  public browserView: BrowserView;

  public isNewTab = false;
  public homeUrl: string;
  public favicon = '';
  public color = '';
  public incognito = false;

  public errorURL = '';

  private hasError = false;

  private readonly window: AppWindow;

  public bounds: any;

  public lastHistoryId: string;

  public bookmark: IBookmark;

  public findInfo = {
    occurrences: '0/0',
    text: '',
  };

  public requestedAuth: IAuthInfo;
  public requestedPermission: {
    name: string;
    url: string;
    details: {
      isMainFrame: boolean;
      requestingUrl: string;
      [key: string]: any;
    };
  };

  private historyQueue = new Queue();

  private lastUrl = '';

  public constructor(window: AppWindow, url: string, incognito: boolean) {
    this.browserView = new BrowserView({
      webPreferences: {
        preload: `${app.getAppPath()}/build/view-preload.bundle.js`,
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: true,
        partition: incognito ? 'view_incognito' : 'persist:view',
        plugins: true,
        nativeWindowOpen: true,
        webSecurity: true,
        javascript: true,
      },
    });

    this.browserView.setBackgroundColor('#FFFFFFFF');

    this.incognito = incognito;

    this.webContents.userAgent = getUserAgentForURL(
      this.webContents.userAgent,
      '',
    );

    (this.webContents as any).windowId = window.win.id;

    this.window = window;
    this.homeUrl = url;

    this.webContents.session.webRequest.onBeforeSendHeaders(
      (details, callback) => {
        const { object: settings } = Application.instance.settings;
        if (settings.doNotTrack) details.requestHeaders['DNT'] = '1';
        if (settings.globalPrivacyControl)
          details.requestHeaders['Sec-GPC'] = '1';
        callback({ requestHeaders: details.requestHeaders });
      },
    );

    ipcMain.handle(`get-error-url-${this.id}`, async () => {
      return this.errorURL;
    });

    this.webContents.on('context-menu', (e, params) => {
      const menu = getViewMenu(this.window, params, this.webContents);
      menu.popup();
    });

    this.webContents.addListener('found-in-page', (e, result) => {
      Application.instance.dialogs
        .getDynamic('find')
        .browserView.webContents.send('found-in-page', result);
    });

    this.webContents.addListener('page-title-updated', async (e, title) => {
      this.window.updateTitle();
      await this.updateData();

      this.emitEvent('title-updated', title);
      await this.updateURL(this.webContents.getURL());
    });

    this.webContents.addListener('did-navigate', async (e, url) => {
      this.browserView.setBackgroundColor('#FFFFFFFF');
      this.emitEvent('did-navigate', url);
      await this.addHistoryItem(url);
      await this.updateURL(url);
    });

    this.webContents.addListener(
      'did-navigate-in-page',
      async (e, url, isMainFrame) => {
        if (isMainFrame) {
          this.browserView.setBackgroundColor('#FFFFFFFF');
          this.window.updateTitle();
          await this.updateData();

          this.emitEvent(
            'title-updated',
            this.browserView.webContents.getTitle(),
          );
          this.emitEvent('did-navigate', url);

          await this.addHistoryItem(url, true);
          await this.updateURL(url);
        }
      },
    );

    this.webContents.addListener('did-stop-loading', async () => {
      this.browserView.setBackgroundColor('#FFFFFFFF');
      this.updateNavigationState();
      this.emitEvent('loading', false);
      await this.updateURL(this.webContents.getURL());
    });

    this.webContents.addListener('did-start-loading', async () => {
      this.browserView.setBackgroundColor('#FFFFFFFF');
      this.hasError = false;
      this.updateNavigationState();
      this.emitEvent('loading', true);
      await this.updateURL(this.webContents.getURL());
    });

    this.webContents.addListener('did-start-navigation', async (e, ...args) => {
      this.browserView.setBackgroundColor('#FFFFFFFF');
      this.updateNavigationState();

      this.favicon = '';

      this.emitEvent('load-commit', ...args);
      await this.updateURL(this.webContents.getURL());
    });

    this.webContents.on(
      'did-start-navigation',
      (e, url, isInPlace, isMainFrame) => {
        if (!isMainFrame) return;
        const newUA = getUserAgentForURL(this.webContents.userAgent, url);
        if (this.webContents.userAgent !== newUA) {
          this.webContents.userAgent = newUA;
        }
      },
    );

    this.webContents.addListener(
      'new-window',
      async (e, url, frameName, disposition) => {
        if (disposition === 'new-window') {
          if (frameName === '_self') {
            e.preventDefault();
            await this.window.viewManager.selected.webContents.loadURL(url);
          } else if (frameName === '_blank') {
            e.preventDefault();
            this.window.viewManager.create(
              {
                url,
                active: true,
              },
              true,
            );
          }
        } else if (disposition === 'foreground-tab') {
          e.preventDefault();
          this.window.viewManager.create({ url, active: true }, true);
        } else if (disposition === 'background-tab') {
          e.preventDefault();
          this.window.viewManager.create({ url, active: true }, true);
        }
      },
    );

    this.webContents.addListener(
      'did-fail-load',
      async (e, errorCode, errorDescription, validatedURL, isMainFrame) => {
        console.error(errorCode, errorDescription, validatedURL, isMainFrame);
        // ignore -3 (ABORTED) - An operation was aborted (due to user action).
        if (isMainFrame && errorCode !== -3) {
          this.errorURL = validatedURL;

          this.hasError = true;

          await this.webContents.loadURL(
            `${ERROR_PROTOCOL}://${NETWORK_ERROR_HOST}/${errorCode}`,
          );
        }
      },
    );

    this.webContents.addListener(
      'page-favicon-updated',
      async (e, favicons) => {
        this.favicon = favicons[0];

        await this.updateData();

        try {
          let fav = this.favicon;

          if (fav.startsWith('http')) {
            fav = await Application.instance.storage.addFavicon(fav);
          }

          this.emitEvent('favicon-updated', fav);
        } catch (e) {
          this.favicon = '';
          console.error(e);
        }
      },
    );

    this.webContents.addListener('zoom-changed', (e, zoomDirection) => {
      const newZoomFactor =
        this.webContents.zoomFactor +
        (zoomDirection === 'in'
          ? ZOOM_FACTOR_INCREMENT
          : -ZOOM_FACTOR_INCREMENT);

      if (
        newZoomFactor <= ZOOM_FACTOR_MAX &&
        newZoomFactor >= ZOOM_FACTOR_MIN
      ) {
        this.webContents.zoomFactor = newZoomFactor;
        this.emitEvent('zoom-updated', this.webContents.zoomFactor);
        window.viewManager.emitZoomUpdate();
      } else {
        e.preventDefault();
      }
    });

    this.webContents.addListener(
      'certificate-error',
      async (
        event: Electron.Event,
        url: string,
        error: string,
        certificate: Electron.Certificate,
        callback: Function,
      ) => {
        event.preventDefault();
        this.errorURL = url;
        await this.webContents.loadURL(
          `${ERROR_PROTOCOL}://${NETWORK_ERROR_HOST}/${error}`,
        );
        callback(false);
      },
    );

    this.webContents.addListener('media-started-playing', () => {
      this.emitEvent('media-playing', true);
    });

    this.webContents.addListener('media-paused', () => {
      this.emitEvent('media-paused', true);
    });

    if (url.startsWith(NEWTAB_URL)) this.isNewTab = true;

    (async () => {
      await this.webContents.loadURL(url);
    })();

    this.browserView.setAutoResize({
      width: true,
      height: true,
      horizontal: false,
      vertical: false,
    });
  }

  public get webContents() {
    return this.browserView.webContents;
  }

  public get url() {
    return this.webContents.getURL();
  }

  public get title() {
    return this.webContents.getTitle();
  }

  public get id() {
    return this.webContents.id;
  }

  public get isSelected() {
    return this.id === this.window.viewManager.selectedId;
  }

  public updateNavigationState() {
    if (this.browserView.webContents.isDestroyed()) return;

    if (this.window.viewManager.selectedId === this.id) {
      this.window.send('update-navigation-state', {
        canGoBack: this.webContents.canGoBack(),
        canGoForward: this.webContents.canGoForward(),
      });
      this.window.send('update-navigation-state-ui', {
        url: this.webContents.getURL()
      });
    }
  }

  public destroy() {
    (this.browserView.webContents as any).destroy();
    this.browserView = null;
  }

  public async updateCredentials() {
    if (
      !process.env.ENABLE_AUTOFILL ||
      this.browserView.webContents.isDestroyed()
    )
      return;

    const item = await Application.instance.storage.findOne<any>({
      scope: 'formfill',
      query: {
        url: this.hostname,
      },
    });

    this.emitEvent('credentials', item != null);
  }

  public async addHistoryItem(url: string, inPage = false) {
    if (
      url !== this.lastUrl &&
      !url.startsWith(WEBUI_BASE_URL) &&
      !url.startsWith(`${ERROR_PROTOCOL}://`) &&
      !this.incognito
    ) {
      const historyItem: IHistoryItem = {
        title: this.title,
        url,
        favicon: this.favicon,
        date: new Date().getTime(),
      };

      await this.historyQueue.enqueue(async () => {
        this.lastHistoryId = (
          await Application.instance.storage.insert<IHistoryItem>({
            scope: 'history',
            item: historyItem,
          })
        )._id;

        historyItem._id = this.lastHistoryId;

        Application.instance.storage.history.push(historyItem);
      });
    } else if (!inPage) {
      await this.historyQueue.enqueue(async () => {
        this.lastHistoryId = '';
      });
    }
  }

  public updateURL = async (url: string) => {
    if (this.lastUrl === url) return;

    this.emitEvent('url-updated', this.hasError ? this.errorURL : url);

    this.lastUrl = url;

    this.isNewTab = url.startsWith(NEWTAB_URL);

    await this.updateData();

    if (process.env.ENABLE_AUTOFILL) await this.updateCredentials();

    this.updateBookmark();

    this.updateUIpage(url);

  };

  public updateUIpage(url: string) {
    this.window.send('is-ui-page', url.startsWith(WEBUI_BASE_URL) || url.startsWith(NETWORK_ERROR_HOST));
  }

  public updateBookmark() {
    this.bookmark = Application.instance.storage.bookmarks.find(
      (x) => x.url === this.url,
    );

    if (!this.isSelected) return;

    this.window.send('is-bookmarked', !!this.bookmark);
  }

  public async updateData() {
    if (!this.incognito) {
      const id = this.lastHistoryId;
      if (id) {
        const { title, color, url, favicon } = this;

        await this.historyQueue.enqueue(async () => {
          await Application.instance.storage.update({
            scope: 'history',
            query: {
              _id: id,
            },
            value: {
              title,
              color,
              url,
              favicon,
            },
            multi: false,
          });

          const item = Application.instance.storage.history.find(
            (x) => x._id === id,
          );

          if (item) {
            item.title = title;
            item.url = url;
            item.favicon = favicon;
          }
        });
      }
    }
  }

  public send(channel: string, ...args: any[]) {
    this.webContents.send(channel, ...args);
  }

  public get hostname() {
    return new URL(this.url).hostname;
  }

  public emitEvent(event: TabEvent, ...args: any[]) {
    this.window.send('tab-event', event, this.id, args);
  }
}