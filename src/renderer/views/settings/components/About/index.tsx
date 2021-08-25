import * as React from 'react';

import { Header, Row, Title, Control } from '../App/style';
import { Button } from '~/renderer/components/Button';
import store from '../../store';
import { BLUE_500 } from '~/renderer/constants';
import { observer } from 'mobx-react-lite';
import { onSwitchChange } from '../../utils';
import { Switch } from '~/renderer/components/Switch';

const DoNotTrackToggle = observer(() => {

  return (
    <Row>
      <Title>
        This software is made with love by the SnailDOS community. It's a fork of Wexond. To check updates, press the 3 dots on the top right, and press 'Update'.
        </Title>
      <Control>
      </Control>
    </Row>
  );
});

export const Privacy = () => {
  return (
    <>
      <Header>Privacy</Header>
    </>
  );
};
