/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';

import { Header, Row, Title, Control } from '../App/style';
import store from '../../store';
import { BLUE_500, RED_500 } from '~/renderer/constants';
import { observer } from 'mobx-react-lite';
import { newTabSwitchChange } from '../../utils';
import { Switch } from '~/renderer/components/Switch';

const WeatherToggle = observer(() => {
  const { weather } = store.settings.newtab;

  return (
    <Row onClick={newTabSwitchChange('weather')}>
      <Title>
        Disable the weather network request on the newtab screen (wttr.in)
      </Title>
      <Control>
        <Switch value={weather} />
      </Control>
    </Row>
  );
});

const NewsToggle = observer(() => {
  const { news } = store.settings.newtab;

  return (
    <Row onClick={newTabSwitchChange('news')}>
      <Title>Disable the news network request on the newtab screen</Title>
      <Control>
        <Switch value={news} />
      </Control>
    </Row>
  );
});

export const Party = () => {
  return (
    <>
      <Header>Third Party Services</Header>
      <span>
        Fifo offers an easy way to block and allow third party services that are
        optional to the user that may use their private infomation for unique
        features.
      </span>
      <br></br>
      <NewsToggle />
      <WeatherToggle />
    </>
  );
};
