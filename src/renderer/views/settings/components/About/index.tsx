import * as React from 'react';

import { Switch } from '~/renderer/components/Switch';
import { Title, Row, Control, Header, SecondaryText } from '../App/style';
import store from '../../store';
import { onSwitchChange } from '../../utils';
import { ipcRenderer } from 'electron';
import { observer } from 'mobx-react-lite';
import { NormalButton } from '../App';

const AskToggle = observer(() => {
  
  return (
    <Row>
      <Title>Fifo is a privacy orientated browser with tons of features such as a built in Ad Blocker. Fifo is made with love by the SnailDOS team. Big thanks to all our contributers on the right!</Title>
      <p></p>
      <div>
      <Title>HzzaAwesome - Banner Design</Title>
      <p></p>
      <Title>SnailDOS - Development and Code</Title>
      <p></p>
      <Title>Wexond Team - For the original Code</Title>
      </div>
    </Row>
  );
});


const Location = observer(() => {
  return (
<div>
</div>
  );
});

export const About = () => {
  return (
    <>
      <Header>About Fifo</Header>
      <Location />
      <AskToggle />
    </>
  );
};
