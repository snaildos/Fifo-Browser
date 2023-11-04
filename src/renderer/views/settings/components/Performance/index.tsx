/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';

import { Header, Row, Title, Control } from '../App/style';
import store from '../../store';
import { BLUE_500, RED_500 } from '~/renderer/constants';
import { observer } from 'mobx-react-lite';
import { alertSwitchChange } from '../../utils';
import { Switch } from '~/renderer/components/Switch';

const HWAToggle = observer(() => {
  const { hardwareacceleration } = store.settings;

  return (
    <Row onClick={alertSwitchChange('hardwareacceleration')}>
      <Title>Enable hardware acceleration</Title>
      <Control>
        <Switch value={hardwareacceleration} />
      </Control>
    </Row>
  );
});

export const Performance = () => {
  return (
    <>
      <Header>Performance Settings</Header>
      <span>
        Fifo offers an easy way to control startup options regarding performance and other perfromance options you may find useful. Typically, we do not recommend editing the settings unless you know what you are doing.
      </span>
      <br></br>
      <HWAToggle />
    </>
  );
};
