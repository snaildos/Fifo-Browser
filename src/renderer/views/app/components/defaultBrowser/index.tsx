import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  StyledDefaultBrowser,
  StyledDefaultBrowserSection,
  Line,
  ButtonPredeterminado,
  Close,
  HiddenDiv,
} from './style';
import { FAVICON as favicon } from '~/renderer/constants/icons';
import * as os from 'os';
import { ipcRenderer } from 'electron';
import { ICON_CLOSE } from '~/renderer/constants/icons';
import store from '../../store';

function getOS() {
  if (window.navigator.appVersion.indexOf('Win') !== -1) {
    return true;
  }
  else if (window.navigator.appVersion.indexOf('Linux') !== -1) { return true }

  return false;
}

const isDefaultOrShowBanner = (isDefault: any) => {
  if (localStorage.getItem('hide-banner') == '1') return false;
  if (!getOS()) return false;

  return !isDefault;
};

const onButtonClick = () => {
  onCloseClick();
  ipcRenderer.send('open-settings-default');
};

const onCloseClick = () => {
  localStorage.setItem('hide-banner', '1');
  document.getElementById('default').style.display = 'none';
  document.getElementById('Line').style.display = 'none';
};

export const DefaultBrowser = observer(() => {
  // localStorage.setItem('hide-banner', "0")

  return isDefaultOrShowBanner(store.isDefaultBrowser) ? (
    <>
      <Line id="Line" />
      <StyledDefaultBrowser id="default">
        <StyledDefaultBrowserSection>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: `url(https://snaildos.com/SnailDOS.jpg)`,
                width: '21px',
                height: '21px',
                backgroundSize: 'cover',
                margin: '0 20px 0 15px',
                minWidth: "21px"
              }}
            ></div>
            <HiddenDiv>Fifo is not your default browser, for maximum security and privacy, we recommend you to use Fifo</HiddenDiv>
            <ButtonPredeterminado onClick={onButtonClick}>
              Set as default!
            </ButtonPredeterminado>
          </div>
          <Close
            icon={ICON_CLOSE}
            title="Don't ask again."
            onClick={onCloseClick}
          />
        </StyledDefaultBrowserSection>
      </StyledDefaultBrowser>
    </>
  ) : null;
});
