import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { Wrapper, Content, IconItem, Menu, Image, RightBar } from './style';
import { TopSites } from '../TopSites';
import { welcome } from '../../../welcome';
import { News } from '../News';
import { Preferences } from '../Preferences';
import {
  ICON_TUNE,
  ICON_SETTINGS,
  ICON_HISTORY,
  ICON_BOOKMARKS,
  ICON_DOWNLOAD,
  ICON_EXTENSIONS,
} from '~/renderer/constants/icons';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { getWebUIURL } from '~/common/webui';

window.addEventListener('mousedown', () => {
  store.dashboardSettingsVisible = false;
});

const onIconClick = (name: string) => () => {
  window.location.href = getWebUIURL(name);
};

const onTuneClick = () => {
  store.dashboardSettingsVisible = !store.dashboardSettingsVisible;
};

const onRefreshClick = () => {
  store.image = '';
  setTimeout(() => {
    localStorage.setItem('imageDate', '');
    store.loadImage();
  }, 50);
};

export default observer(() => {

  if (localStorage.getItem("not_new") != "1" && !store.isIncognito) {
    window.location.replace(getWebUIURL("welcome"))
    if (localStorage.getItem("not_new") == "1") alreadyMaded();
    localStorage.setItem("not_new", "1")
  }

  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <div>
        <WebUIStyle />

        <Preferences />

        <Wrapper fullSize={store.fullSizeImage}>

          <Image src={store.imageVisible ? store.image : ''}></Image>
          <Content>{store.topSitesVisible && <TopSites></TopSites>}</Content>

          <RightBar>
            <IconItem
              imageSet={store.imageVisible}
              title="Configuracion de el dashboard"
              icon={ICON_TUNE}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={onTuneClick}
            ></IconItem>
          </RightBar>
          {store.quickMenuVisible && (
            <Menu>
              <IconItem
                imageSet={store.imageVisible}
                title="Configuracion"
                icon={ICON_SETTINGS}
                onClick={onIconClick('settings')}
              ></IconItem>
              <IconItem
                imageSet={store.imageVisible}
                title="Historial"
                icon={ICON_HISTORY}
                onClick={onIconClick('history')}
              ></IconItem>
              <IconItem
                imageSet={store.imageVisible}
                title="Marcadores"
                icon={ICON_BOOKMARKS}
                onClick={onIconClick('bookmarks')}
              ></IconItem>
              {/* <IconItem
                imageSet={store.imageVisible}
                title="Descargas"
                icon={ICON_DOWNLOAD}
                onClick={onIconClick('downloads')}
              ></IconItem>
              <IconItem
                imageSet={store.imageVisible}
                title="Extensiones"
                icon={ICON_EXTENSIONS}
                onClick={onIconClick('extensions')}
              ></IconItem> */}
            </Menu>
          )}
        </Wrapper>
        {store.newsBehavior !== 'hidden' && (
          <Content>
            <News></News>
          </Content>
        )}
      </div>
    </ThemeProvider>
  );
});
