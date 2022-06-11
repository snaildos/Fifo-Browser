/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { Wrapper, Content, IconItem, Menu, Image, RightBar, StyledForecast } from './style';
import { TopSites } from '../TopSites';
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
import { useQuery } from 'react-query';
import { QueryClientProvider, QueryClient } from 'react-query';
import { getWebUIURL } from '~/common/webui';

const queryClient = new QueryClient();

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

const Forecast = () => {
  const { data: forecast } = useQuery(['weather'], async () => {
    try {
      const res = await (await fetch(`https://wttr.in/?format=%c%20%C`)).text();
      return res;
    } catch {
      return 'Failed to load weather';
    }
  });
  
  return (
    <StyledForecast>
      {new Date().toLocaleDateString([], {
        month: 'long',
        day: '2-digit',
      })}
      {' - '}
      {forecast}
    </StyledForecast>
  );
};

export default observer(() => {
  if (store.settings.notnew != "false") {
    window.location.replace(getWebUIURL("welcome"))
  }


  return (
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={{ ...store.theme }}>
      <div>
        <WebUIStyle />

        <Preferences />

        <Wrapper fullSize={store.fullSizeImage}>

          <Image src={store.imageVisible ? store.image : ''}></Image>
          <Content>
          <Forecast />
          {store.topSitesVisible && <TopSites></TopSites>}
          </Content>

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
    </QueryClientProvider>
  );
});
