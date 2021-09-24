import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { EASING_FUNCTION, BLUE_500 } from '~/renderer/constants';
import { ICON_ARROW_RIGHT } from '~/renderer/constants/icons';
import { Button as ExtraStyledButton } from '~/renderer/components/Button';
import {
  StyledSection,
  Button,
  Title,
  Description,
  StyledLink,
  Favicon,
  Option,
  Icon,
} from './style';
import { getWebUIURL } from '~/common/webui';
import { StyledButton } from '~/renderer/components/Button/styles';

var page = 1
var theme = "Light"

const alreadyMaded = () => {
  window.location.replace(getWebUIURL('newtab'))
}

const nextPage = () => {
  const _page = JSON.stringify(page)
  document.getElementsByClassName("banner"+_page)[0].classList.remove("active")
  document.getElementsByClassName("banner"+_page)[0].classList.add("disabled")
 
  page += 1
  document.getElementsByClassName("banner"+JSON.stringify(page))[0].classList.add("active")
}

const changeDarkOrLight = (mode: string) => {
  theme = mode
  document.getElementsByClassName(mode)[0].classList.add("active")

  const _mode: any = mode === "Light" ? "Dark" : "Light";
  document.getElementsByClassName(_mode)[0].classList.remove("active")
}

const commit = () => {

  store.settings.themeAuto = false;
  store.settings.theme = "wexond-dark";

  store.save();

  alreadyMaded()
}

const addDefault = () => {
  window.location.href = "ms-settings:defaultapps"
  
  nextPage()
}

export default observer(() => {

  window.onload = function() {
    page = 1
    document.getElementsByClassName("banner1")[0].classList.add("active")
    //console.log(await defaultBrowser());

  }

  if (localStorage.getItem("not_new") == "1") alreadyMaded();

  return (
    <ThemeProvider theme={{ ...store.theme }} style={{position: 'relative'}}>
      <WebUIStyle />


      <StyledSection className="banner1">
        <Description>Welcome to Fifo</Description>
        <Title>Let's personalize Fifo</Title>
        <Button theme={store.theme} onClick={nextPage}>Next!</Button>
        <StyledLink onClick={alreadyMaded}>Skip setup</StyledLink>
      </StyledSection>

      <StyledSection className="banner2">
        <Favicon></Favicon>
        <Description style={{fontSize: "1.5rem", fontWeight: 500, margin: 0, marginBottom: "48px", opacity: '1' }}>Pick your theme!</Description>
        <div style={{ display: 'flex', width: "550px", justifyContent: "space-around" }}>
          <Option onClick={() => changeDarkOrLight("Light")} className="Light active">
            <div style={{ border: "1px solid rgb(95, 99, 104)", backgroundColor: "#fff", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Light
            </div>
          </Option>
          <Option onClick={() => changeDarkOrLight("Dark")} className="Dark">
            <div style={{ border: "1px solid rgb(95, 99, 104)", backgroundColor: "rgb(95, 99, 104)", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Dark
            </div>
          </Option>
        </div>
        <div style={{ width: '500px', display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
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
          foreground={store.theme['pages.textColor'] == "#fff" ? "black" : "white"}
          style={{ marginLeft: 8, position: 'relative' }}
          onClick={nextPage}
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: "center" }}>
              Next <Icon theme={store.theme} icon={ICON_ARROW_RIGHT} />
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection>

      {/* <StyledSection className="banner3">
        <Favicon></Favicon>
        <Description style={{fontSize: "1.5rem", fontWeight: 500, margin: 0, marginBottom: "48px", opacity: '1' }}>Let's get Fifo setup for you!</Description>
        <div style={{ display: 'flex', width: "15%", justifyContent: "space-around" }}>
        </div>
        <div style={{ width: '20%', display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
          <ExtraStyledButton
          background="transparent"
          foreground="rgb(138, 180, 248)"
          style={{ marginLeft: 8 }}
          onClick={alreadyMaded}
          >
            Already set!
          </ExtraStyledButton>
          <ExtraStyledButton
          background="rgb(138, 180, 248)"
          foreground={store.theme['pages.textColor'] == "#fff" ? "black" : "white"}
          style={{ marginLeft: 8, position: 'relative' }}
          onClick={addDefault}
          >
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: "center" }}>
              Add default browser
            </div>
          </ExtraStyledButton>
        </div>
      </StyledSection> */}

      <StyledSection className="banner3">
        <Description>Fifo is the new privacy orientated browser!</Description>
        <Title>Inbuilt adblocker and more, let's start.</Title>
        <Button theme={store.theme} onClick={commit}>Let's get started!</Button>
      </StyledSection>
    </ThemeProvider>
  );
});
