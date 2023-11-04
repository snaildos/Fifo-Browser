/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { ICON_ARROW_RIGHT } from '~/renderer/constants/icons';
import { Button as ExtraStyledButton } from '~/renderer/components/Button';
import {
  StyledSection,
  Button,
  Title,
  Description,
  Favicon,
  Option,
  Icon,
} from './style';
import { ContextMenuItem } from '~/renderer/components/ContextMenu';
import { Switch } from '~/renderer/components/Switch';
import { newTabSwitchChange } from '../../../settings/utils/settings';
import { getWebUIURL } from '~/common/webui';
import settingstore from '../../../settings/store/index';

let page = 1;
let theme = 'Dark';
let engine = 'duckduckgo';
settingstore.settings.newtab.weather = false;
settingstore.settings.newtab.news = false;

store.settings.theme = 'wexond-dark';

const alreadyMaded = () => {
  nextPage();
};

const nextPage = () => {
  const _page = JSON.stringify(page);
  document
    .getElementsByClassName('banner' + _page)[0]
    .classList.remove('active');
  document
    .getElementsByClassName('banner' + _page)[0]
    .classList.add('disabled');

  page += 1;
  document
    .getElementsByClassName('banner' + JSON.stringify(page))[0]
    .classList.add('active');
};

const themeset = (mode: string) => {
  theme = mode;

  if (theme == 'Light') {
    document.getElementsByClassName('Dark')[0].classList.remove('active');
    document.getElementsByClassName('Blue')[0].classList.remove('active');
    document.getElementsByClassName('Lavender')[0].classList.remove('active');
    document.getElementsByClassName('Light')[0].classList.add('active');
    store.settings.theme = 'wexond-light';
    store.settings.themeAuto = false;
    store.save();
  } else if (theme == 'Dark') {
    document.getElementsByClassName('Light')[0].classList.remove('active');
    document.getElementsByClassName('Blue')[0].classList.remove('active');
    document.getElementsByClassName('Lavender')[0].classList.remove('active');
    document.getElementsByClassName('Dark')[0].classList.add('active');
    store.settings.theme = 'wexond-dark';
    store.settings.themeAuto = false;
    store.save();
  } else if (theme == 'Blue') {
    document.getElementsByClassName('Light')[0].classList.remove('active');
    document.getElementsByClassName('Lavender')[0].classList.remove('active');
    document.getElementsByClassName('Dark')[0].classList.remove('active');
    document.getElementsByClassName('Blue')[0].classList.add('active');
    store.settings.theme = 'fifo-blue';
    store.settings.themeAuto = false;
    store.save();
  } else if (theme == 'Lavender') {
    document.getElementsByClassName('Light')[0].classList.remove('active');
    document.getElementsByClassName('Blue')[0].classList.remove('active');
    document.getElementsByClassName('Dark')[0].classList.remove('active');
    document.getElementsByClassName('Lavender')[0].classList.add('active');
    store.settings.theme = 'fifo-lavender';
    store.settings.themeAuto = false;
    store.save();
  }
};

const engineset = (mode: string) => {
  engine = mode;

  if (engine == 'duckduckgo') {
    document.getElementsByClassName('google')[0].classList.remove('active');
    document.getElementsByClassName('bing')[0].classList.remove('active');
    document.getElementsByClassName('ecosia')[0].classList.remove('active');
    document.getElementsByClassName('duckduckgo')[0].classList.add('active');
    store.settings.searchEngine = '0';
    store.save();
  } else if (engine == 'google') {
    document.getElementsByClassName('duckduckgo')[0].classList.remove('active');
    document.getElementsByClassName('bing')[0].classList.remove('active');
    document.getElementsByClassName('ecosia')[0].classList.remove('active');
    document.getElementsByClassName('google')[0].classList.add('active');
    store.settings.searchEngine = '1';
    store.save();
  } else if (engine == 'bing') {
    document.getElementsByClassName('duckduckgo')[0].classList.remove('active');
    document.getElementsByClassName('google')[0].classList.remove('active');
    document.getElementsByClassName('ecosia')[0].classList.remove('active');
    document.getElementsByClassName('bing')[0].classList.add('active');
    store.settings.searchEngine = '2';
    store.save();
  } else if (engine == 'ecosia') {
    document.getElementsByClassName('duckduckgo')[0].classList.remove('active');
    document.getElementsByClassName('google')[0].classList.remove('active');
    document.getElementsByClassName('bing')[0].classList.remove('active');
    document.getElementsByClassName('ecosia')[0].classList.add('active');
    store.settings.searchEngine = '3';
    store.save();
  }
};

const commit = () => {
  store.settings.notnew = 'false';
  store.settings.changelog = '1.3.1';
  store.save();
  window.location.replace(getWebUIURL('newtab'));
};

const addDefault = () => {
  window.location.href = 'ms-settings:defaultapps';
  nextPage();
};

const NewsToggle = observer(() => {
  const { news } = settingstore.settings.newtab;

  return (
    <ContextMenuItem bigger onClick={newTabSwitchChange('news')}>
      <div style={{ flex: 1 }}>Disable News network request (github.com)</div>
      <Switch value={news}></Switch>
    </ContextMenuItem>
  );
});

const WeatherToggle = observer(() => {
  const { weather } = settingstore.settings.newtab;

  return (
    <ContextMenuItem bigger onClick={newTabSwitchChange('weather')}>
      <div style={{ flex: 1 }}>Disable Weather network request (wttr.in)</div>
      <Switch value={weather}></Switch>
    </ContextMenuItem>
  );
});

export default observer(() => {
  window.onload = function () {
    page = 1;
    document.getElementsByClassName('Dark')[0].classList.add('active');
    store.settings.theme = 'wexond-dark';
    document.getElementsByClassName('banner1')[0].classList.add('active');
    // console.log(await defaultBrowser());
    document.getElementsByClassName('duckduckgo')[0].classList.add('active');
    engineset('duckduckgo');
  };

  return (
    <ThemeProvider theme={{ ...store.theme }} style={{ position: 'relative' }}>
      <WebUIStyle />

      <StyledSection className="banner1">
        <Description>Welcome to Fifo!</Description>
        <Title>Lets get started!</Title>
        <Button theme={store.theme} onClick={nextPage}>
          Start!
        </Button>
      </StyledSection>

      <StyledSection className="banner2">
        <Favicon></Favicon>
        <Description
          style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            margin: 0,
            marginBottom: '48px',
            opacity: '1',
          }}
        >
          Pick a theme!
        </Description>
        <div
          style={{
            display: 'flex',
            width: '550px',
            justifyContent: 'space-around',
          }}
        >
          <Option onClick={() => themeset('Light')} className="Light">
            <div
              style={{
                border: '1px solid rgb(95, 99, 104)',
                backgroundColor: '#fff',
                borderRadius: '50%',
                display: 'flex',
                height: '3rem',
                marginBottom: '.50rem',
                width: '3rem',
              }}
            ></div>
            <div>Light</div>
          </Option>
          <Option onClick={() => themeset('Dark')} className="Dark">
            <div
              style={{
                border: '1px solid rgb(95, 99, 104)',
                backgroundColor: 'rgb(95, 99, 104)',
                borderRadius: '50%',
                display: 'flex',
                height: '3rem',
                marginBottom: '.50rem',
                width: '3rem',
              }}
            ></div>
            <div>Dark</div>
          </Option>
          <Option onClick={() => themeset('Blue')} className="Blue">
            <div
              style={{
                border: '1px solid #0000FF',
                backgroundColor: '#0026ff',
                borderRadius: '50%',
                display: 'flex',
                height: '3rem',
                marginBottom: '.50rem',
                width: '3rem',
              }}
            ></div>
            <div>Blue</div>
          </Option>
          <Option onClick={() => themeset('Lavender')} className="Lavender">
            <div
              style={{
                border: '1px solid rgb(95, 99, 104)',
                backgroundColor: '#b500fc',
                borderRadius: '50%',
                display: 'flex',
                height: '3rem',
                marginBottom: '.50rem',
                width: '3rem',
              }}
            ></div>
            <div>Lavender</div>
          </Option>
        </div>
        <div
          style={{
            width: '500px',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '3rem',
          }}
        >
          <ExtraStyledButton
            background="transparent"
            foreground="rgb(138, 180, 248)"
            style={{ marginLeft: 8 }}
            onClick={nextPage}
          >
            Skip
          </ExtraStyledButton>
          <ExtraStyledButton
            background="rgb(138, 180, 248)"
            foreground={
              store.theme['pages.textColor'] == '#fff' ? 'black' : 'white'
            }
            style={{ marginLeft: 8, position: 'relative' }}
            onClick={nextPage}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Next <Icon theme={store.theme} icon={ICON_ARROW_RIGHT} />
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection>

      <StyledSection className="banner3">
        <Favicon></Favicon>
        <Description
          style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            margin: 0,
            marginBottom: '48px',
            opacity: '1',
          }}
        >
          Let us get your search engine setup...
        </Description>
        <div
          style={{
            display: 'flex',
            width: '550px',
            justifyContent: 'space-around',
          }}
        >
          <Option
            onClick={() => engineset('duckduckgo')}
            className="duckduckgo"
          >
            <div
              style={{
                border: '1px solid rgb(95, 99, 104)',
                background: `url(https://cdn.snaildos.com/logo/fifo/ddg.png)`,
                backgroundSize: 'cover',
                borderRadius: '50%',
                display: 'flex',
                height: '3rem',
                marginBottom: '.50rem',
                width: '3rem',
              }}
            ></div>
            <div>DuckDuckGo</div>
          </Option>
          <Option onClick={() => engineset('google')} className="google">
            <div
              style={{
                border: '1px solid rgb(95, 99, 104)',
                background: `url(https://cdn.snaildos.com/logo/fifo/google.png)`,
                backgroundSize: 'cover',
                borderRadius: '50%',
                display: 'flex',
                height: '3rem',
                marginBottom: '.50rem',
                width: '3rem',
              }}
            ></div>
            <div>Google</div>
          </Option>
          <Option onClick={() => engineset('bing')} className="bing">
            <div
              style={{
                border: '1px solid #0000FF',
                background: `url(https://cdn.snaildos.com/logo/fifo/bing.png)`,
                backgroundSize: 'cover',
                borderRadius: '50%',
                display: 'flex',
                height: '3rem',
                marginBottom: '.50rem',
                width: '3rem',
              }}
            ></div>
            <div>Bing</div>
          </Option>
          <Option onClick={() => engineset('ecosia')} className="ecosia">
            <div
              style={{
                border: '1px solid rgb(95, 99, 104)',
                background: `url(https://cdn.snaildos.com/logo/fifo/ecosia.png)`,
                backgroundSize: 'cover',
                borderRadius: '50%',
                display: 'flex',
                height: '3rem',
                marginBottom: '.50rem',
                width: '3rem',
              }}
            ></div>
            <div>Ecosia</div>
          </Option>
        </div>
        <div
          style={{
            width: '500px',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '3rem',
          }}
        >
          <ExtraStyledButton
            background="rgb(138, 180, 248)"
            foreground={
              store.theme['pages.textColor'] == '#fff' ? 'black' : 'white'
            }
            style={{ marginLeft: 8, position: 'relative' }}
            onClick={nextPage}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Next <Icon theme={store.theme} icon={ICON_ARROW_RIGHT} />
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection>

      <StyledSection className="banner4">
        <Favicon></Favicon>
        <Description
          style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            margin: 0,
            marginBottom: '48px',
            opacity: '1',
          }}
        >
          Do you want these features to be disabled for privacy?
        </Description>
        <div
          style={{
            display: 'flex',
            width: '550px',
            justifyContent: 'space-around',
          }}
        >
          <p></p>
          <WeatherToggle></WeatherToggle>
          <p></p>
          <NewsToggle></NewsToggle>
        </div>
        <div
          style={{
            width: '500px',
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '3rem',
          }}
        >
          <ExtraStyledButton
            background="rgb(138, 180, 248)"
            foreground={
              store.theme['pages.textColor'] == '#fff' ? 'black' : 'white'
            }
            style={{ marginLeft: 8, position: 'relative' }}
            onClick={nextPage}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Next <Icon theme={alreadyMaded} icon={ICON_ARROW_RIGHT} />
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection>

      <StyledSection className="banner5">
        <Favicon></Favicon>
        <Title>Fifo Setup</Title>
        <Description
          style={{
            fontSize: '1.5rem',
            fontWeight: 500,
            margin: 0,
            marginBottom: '48px',
            opacity: '1',
          }}
        >
          For maximum privacy, set Fifo as your default browser!
        </Description>
        <div
          style={{
            display: 'flex',
            width: '15%',
            justifyContent: 'space-around',
          }}
        ></div>
        <div
          style={{
            width: '20%',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '3rem',
          }}
        >
          <ExtraStyledButton
            background="transparent"
            foreground="rgb(138, 180, 248)"
            style={{ marginLeft: 8 }}
            onClick={alreadyMaded}
          >
            Skip!
          </ExtraStyledButton>
          <ExtraStyledButton
            background="rgb(138, 180, 248)"
            foreground={
              store.theme['pages.textColor'] == '#fff' ? 'black' : 'white'
            }
            style={{ marginLeft: 8, position: 'relative' }}
            onClick={addDefault}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Add default browser
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection>

      <StyledSection className="banner6">
        <Description>Fifo is the new privacy orientated browser!</Description>
        <Title>Inbuilt adblocker and more, let's start.</Title>
        <Button theme={store.theme} onClick={commit}>
          Lets get started!
        </Button>
      </StyledSection>
    </ThemeProvider>
  );
});
