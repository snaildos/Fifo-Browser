import * as React from 'react';

import { Header, Row, Title, Control } from '../App/style';
import { Button } from '~/renderer/components/Button';
import store, { QuickRange } from '../../store';
import { BLUE_500 } from '~/renderer/constants';
import { observer } from 'mobx-react-lite';
import { onSwitchChange } from '../../utils';
import { Switch } from '~/renderer/components/Switch';

const onClearClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();

  store.sections.map((data) =>
    data.items.map((item) => store.removeItems([item._id])),
  );

  // store.clear();
  // TODO: ipcRenderer.send('clear-browsing-data');
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


export const Privacy = () => {
  return (
    <>
      <Header>Privacy</Header>
      <Button
        type="outlined"
        foreground={BLUE_500}
        onClick={onClearClick}
      >
        Clear browsing data
      </Button>
      <GlobalPrivacyControlToggle />
      <DoNotTrackToggle />
    </>
  );
};
