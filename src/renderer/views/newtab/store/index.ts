import { observable, computed, makeObservable } from 'mobx';
import { ISettings, ITheme, IVisitedItem } from '~/interfaces';
import { getTheme } from '~/utils/themes';
import { INewsItem } from '~/interfaces/news-item';
import { networkMainChannel } from '~/common/rpc/network';
import { ipcRenderer } from 'electron';
import { NEWS_API_KEY } from '../../app/constants';

type NewsBehavior = 'on-scroll' | 'always-visible' | 'hidden';
export type Preset = 'focused' | 'inspirational' | 'informational' | 'custom';
import { DEFAULT_SETTINGS } from '~/constants';

export class Store {
  public settings: ISettings = { ...(window as any).settings };

  public get theme(): ITheme {
    return getTheme(this.settings.theme);
  }

  public news: INewsItem[] = [];

  private _newsBehavior: NewsBehavior = 'on-scroll';

  public get newsBehavior() {
    return this._newsBehavior;
  }

  public set newsBehavior(value: NewsBehavior) {
    this._newsBehavior = value;

    if (value === 'always-visible') {
      this.loadNews();
    }
  }

  public get fullSizeImage() {
    return this.newsBehavior === 'on-scroll' || this.newsBehavior === 'hidden';
  }

  public image = '';

  private _imageVisible = true;

  public set imageVisible(value: boolean) {
    this._imageVisible = value;
    if (value && this.image == '') this.loadImage();
  }

  public get imageVisible() {
    return this._imageVisible;
  }

  public changeImageDaily = true;

  public topSitesVisible = true;

  public quickMenuVisible = true;

  public overflowVisible = false;

  private _preferencesContent: 'main' | 'custom' = 'main';

  public set preferencesContent(value: 'main' | 'custom') {
    this._preferencesContent = value;
    this.overflowVisible = false;
  }
  public get preferencesContent() {
    return this._preferencesContent;
  }

  private _dashboardSettingsVisible = false;

  public set dashboardSettingsVisible(value: boolean) {
    this._dashboardSettingsVisible = value;

    if (!value) {
      this.preferencesContent = 'main';
    }
  }

  public get dashboardSettingsVisible() {
    return this._dashboardSettingsVisible;
  }

  private _preset: Preset = 'inspirational';

  public get preset() {
    return this._preset;
  }

  public winId = ipcRenderer.sendSync('get-window-id');

  public isIncognito = ipcRenderer.sendSync(`is-incognito-${this.winId}`);

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public set preset(value: Preset) {
    this._preset = value;

    if (['focused', 'informational', 'inspirational'].includes(value)) {
      this.quickMenuVisible = true;
      this.topSitesVisible = true;
      this.changeImageDaily = true;
    }

    if (['focused', 'inspirational'].includes(value)) {
      this.newsBehavior = 'on-scroll';
    }

    if (['informational', 'inspirational'].includes(value)) {
      this.imageVisible = true;
    }

    if (value === 'focused') {
      this.imageVisible = false;
    } else if (value === 'informational') {
      this.newsBehavior = 'always-visible';
    }
  }

  public topSites: IVisitedItem[] = [];

  public updateSettings(newSettings: ISettings) {
    this.settings = { ...this.settings, ...newSettings };
  }

  public constructor() {
    makeObservable(this, {
      settings: observable,
      theme: computed,
      topSites: observable,
    });

    (window as any).updateSettings = (settings: ISettings) => {
      this.settings = { ...this.settings, ...settings };
    };

    this.preset = localStorage.getItem('preset') as Preset;

    if (this.preset === 'custom') {
      [
        'changeImageDaily',
        'quickMenuVisible',
        'topSitesVisible',
        'imageVisible',
      ].forEach(
        (x) =>
          ((this as any)[x] =
            localStorage.getItem(x) == null
              ? (this as any)[x]
              : JSON.parse(localStorage.getItem(x))),
      );

      this.newsBehavior = localStorage.getItem('newsBehavior') as NewsBehavior;
    }

    if (this.imageVisible) {
      this.loadImage();
    }

    this.loadTopSites();

    window.onscroll = () => {
      this.updateNews();
    };

    window.onresize = () => {
      this.updateNews();
    };
  }

  
  public async loadImage() {
    let url = this.settings.tab.image;
    let isNewUrl = false;

    if (this.changeImageDaily) {
      const dateString = localStorage.getItem('imageDate');

      if (dateString && dateString !== '') {
        const date = new Date(dateString);
        const date2 = new Date();
        const diffTime = Math.floor(
          (date2.getTime() - date.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (diffTime > 1) {
          url = '';
          isNewUrl = true;
        }
      }
    }

    if (!url || url == '') {
      url = 'https://file.coffee/u/y970mT9Cg5NkPg.png';
      isNewUrl = true;
    }

    fetch(url)
      .then((response) => Promise.all([response.url, response.blob()]))
      .then(([resource, blob]) => {
        this.image = URL.createObjectURL(blob);

        return resource;
      })
      .then((imgUrl) => {
        if (isNewUrl) {
          localStorage.setItem('imageURL', imgUrl);
          localStorage.setItem('imageDate', new Date().toString());
        }
      })
      .catch((e) => console.error(e));
  }


  public async updateNews() {
    const scrollPos = window.scrollY;
    const scrollMax =
      document.body.scrollHeight - document.body.clientHeight - 768;

    if (scrollPos >= scrollMax) {
      try {
        await this.loadNews();
      } catch (e) {
        console.error(e);
      }
    }
  }

  public async loadTopSites() {
    this.topSites = await (window as any).getTopSites(8);
  }
  
  public async loadNews() {
    const randompage = Math.floor(Math.random() * 10) + 1;
    const { data } = await networkMainChannel.getInvoker().request(`
      https://newsapi.org/v2/top-headlines?country=us&page=1&apiKey=${NEWS_API_KEY}
    `); // ?lang=
    const json = JSON.parse(data);

    if (json.articles) {
      this.news = this.news.concat(json.articles);
    } else {
      throw new Error('Error fetching news');
    }
}

}

export default new Store();