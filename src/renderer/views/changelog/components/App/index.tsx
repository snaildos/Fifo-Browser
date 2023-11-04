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
  StyledLink,
  Favicon,
  Icon,
} from './style';
import { getWebUIURL } from '~/common/webui';
import { ipcRenderer } from 'electron';

let page = 1;

store.settings.theme = 'wexond-dark';

const alreadyMaded = () => {
  if (store.settings.changelog === '1.2.0') {
    ipcRenderer.invoke('permission-unlink');
    ipcRenderer.invoke('favicon-unlink');
  }
  store.settings.changelog = '1.3.1';
  store.save();
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

const commit = () => {
  window.location.replace(getWebUIURL('newtab'));
};

export default observer(() => {
  window.onload = function () {
    const oldver = store.settings.changelog;
    const newver = '1.3.1';
    if (newver >= oldver) {
      console.log('Update is required.');
      // Nothing yet since we dont need to upgrade anything
    } else {
      // Typically this means an update is not needed, but old versions will actually return "null" so we check for that.
      if (oldver == null) {
        alert(
          'You are upgrading from Fifo v1.1.0, we recommend once you finish the update proccess, you should uninstall all of your currently installed chrome extensions.',
        );
      }
    }
    page = 1;
    document.getElementsByClassName('banner1')[0].classList.add('active');
    // console.log(await defaultBrowser());
  };

  return (
    <ThemeProvider theme={{ ...store.theme }} style={{ position: 'relative' }}>
      <WebUIStyle />

      <StyledSection className="banner1">
        <Description>🎉 Fifo has been updated! 🎉</Description>
        <Title>Press Start to continue!</Title>
        <Button theme={store.theme} onClick={nextPage}>
          Start
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
          What has been changed?
        </Description>
        <Description>
          Introducing Fifo Final 2022 Update (v1.3.1)
        </Description>
        <Description>- Add AMOLED Mode</Description>
        <Description>- Rewrite Setup System</Description>
        <Description>- Fixed issues with dark mode not being applied</Description>
        <Description>- Fixed time not being update on newtab</Description>
        <Description>- Update over 400 dependencies</Description>
        <Description>- Security architecture upgrade</Description>
        <Description>Much much more!</Description>
        <a
          href="https://github.com/snaildos/Fifo-Browser/blob/main/CHANGELOG.md"
          target="_blank"
          rel="noreferrer"
        >
          <StyledLink>
            View our full changelog for this release and our past releases!
          </StyledLink>
        </a>
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
            style={{ position: 'relative' }}
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
              Cool <Icon theme={store.theme} icon={ICON_ARROW_RIGHT} />
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection>

      <StyledSection className="banner3">
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
          For maximum privacy, set Fifo as your default browser! Press the Start
          button to upgrade the Fifo database and start browsing!
        </Description>
        <div
          style={{
            display: 'flex',
            width: '15%',
            justifyContent: 'space-around',
          }}
        ></div>
        <ExtraStyledButton
          background="rgb(138, 180, 248)"
          foreground={
            store.theme['pages.textColor'] == '#fff' ? 'black' : 'white'
          }
          onClick={alreadyMaded}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Start Using Fifo
          </div>
        </ExtraStyledButton>
      </StyledSection>

      <StyledSection className="banner4">
        <Description>Fifo is the new privacy orientated browser!</Description>
        <Title>Inbuilt adblocker and more, what are you waiting for?</Title>
        <p></p>
        <Description>
          Depending on the version you are updating from, data may be modified
          to support later versions.
        </Description>
        <Button theme={store.theme} onClick={commit}>
          Start Browsing
        </Button>
      </StyledSection>
    </ThemeProvider>
  );
});
