/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';

import { Header, Row, Title, Control } from '../App/style';
import { Button } from '~/renderer/components/Button';
import store from '../../store';
import { BLUE_500 } from '~/renderer/constants';
import { observer } from 'mobx-react-lite';
import { onSwitchChange, alertSwitchChange } from '../../utils';
import { Switch } from '~/renderer/components/Switch';
import { ipcRenderer } from 'electron';

const historyClearClick = (e: React.MouseEvent<HTMLDivElement>) => {
  ipcRenderer.invoke('history-unlink');
};

const faviconClearClick = (e: React.MouseEvent<HTMLDivElement>) => {
  ipcRenderer.invoke('favicon-unlink');
};

const permissionClearClick = (e: React.MouseEvent<HTMLDivElement>) => {
  ipcRenderer.invoke('permission-unlink');
};

const DoNotTrackToggle = observer(() => {
  const { doNotTrack } = store.settings;

  return (
    <Row onClick={onSwitchChange('doNotTrack')}>
      <Title>
        Send a &quot;Do Not Track&quot; request with your browsing traffic. Not
        recommended,{' '}
        <a
          href="https://spreadprivacy.com/do-not-track"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          see why
        </a>
      </Title>
      <Control>
        <Switch value={doNotTrack} />
      </Control>
    </Row>
  );
});

const GlobalPrivacyControlToggle = observer(() => {
  const { globalPrivacyControl } = store.settings;

  return (
    <Row onClick={onSwitchChange('globalPrivacyControl')}>
      <Title>
        Send a{' '}
        <a
          href="https://globalprivacycontrol.org"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Global Privacy Control
        </a>{' '}
        request with your browsing traffic
      </Title>
      <Control>
        <Switch value={globalPrivacyControl} />
      </Control>
    </Row>
  );
});

const CertificateToggle = observer(() => {
  const { ignoreCertificate } = store.settings;

  return (
    <Row onClick={alertSwitchChange('ignoreCertificate')}>
      <Title>
        Ignore &quot;HTTPS Certificates&quot; and if they are expired.
        <br></br>
        <b>
          WARNING. If you do toggle this on, please toggle it back on.
          <br></br>
          This protects you against phising, hijacked websites and network
          interceptions.
          <br></br>
          Turning this on should only be LAST RESORT.
        </b>
      </Title>
      <Control>
        <Switch value={ignoreCertificate} />
      </Control>
    </Row>
  );
});

const AutoplayToggle = observer(() => {
  const { autoplay } = store.settings;

  return (
    <Row onClick={alertSwitchChange('autoplay')}>
      <Title>
        Allow &quot;website content (videos, audio, animated images)&quot; to
        autoplay upon page load.
        <br></br>
      </Title>
      <Control>
        <Switch value={autoplay} />
      </Control>
    </Row>
  );
});

export const Privacy = () => {
  return (
    <>
      <Header>Privacy</Header>
      <Row>
        <Button
          type="outlined"
          foreground={BLUE_500}
          onClick={historyClearClick}
        >
          Clear search history
        </Button>
        <p>⠀</p>
        <Button
          type="outlined"
          foreground={BLUE_500}
          onClick={faviconClearClick}
        >
          Clear favicon database
        </Button>
        <p>⠀</p>
        <Button
          type="outlined"
          foreground={BLUE_500}
          onClick={permissionClearClick}
        >
          Clear website permissions
        </Button>
      </Row>
      <GlobalPrivacyControlToggle />
      <DoNotTrackToggle />
      <CertificateToggle />
      <AutoplayToggle />
    </>
  );
};
