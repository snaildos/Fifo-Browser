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

store.settings.theme = "wexond-dark";

const alreadyMaded = () => {
  nextPage()
}


const nextPage = () => {
  const _page = JSON.stringify(page)
  document.getElementsByClassName("banner"+_page)[0].classList.remove("active")
  document.getElementsByClassName("banner"+_page)[0].classList.add("disabled")
 
  page += 1
  document.getElementsByClassName("banner"+JSON.stringify(page))[0].classList.add("active")
}

const themeset = (mode: string) => {
  theme = mode

  if (theme == "Light") {
    document.getElementsByClassName("Dark")[0].classList.remove("active")
    document.getElementsByClassName("Blue")[0].classList.remove("active")
    document.getElementsByClassName("Lavender")[0].classList.remove("active")
    document.getElementsByClassName("Light")[0].classList.add("active")
    store.settings.theme = "wexond-light";
    store.settings.themeAuto = false;
    store.settings.notnew = "false";
    store.save();
  } else if (theme =="Dark") {
    document.getElementsByClassName("Light")[0].classList.remove("active")
    document.getElementsByClassName("Blue")[0].classList.remove("active")
    document.getElementsByClassName("Lavender")[0].classList.remove("active")
    document.getElementsByClassName("Dark")[0].classList.add("active")
    store.settings.theme = "wexond-dark";
    store.settings.themeAuto = false;
    store.settings.notnew = "false";
    store.save();
  } else if (theme =="Blue") {
    document.getElementsByClassName("Light")[0].classList.remove("active")
    document.getElementsByClassName("Lavender")[0].classList.remove("active")
    document.getElementsByClassName("Dark")[0].classList.remove("active")
    document.getElementsByClassName("Blue")[0].classList.add("active")
    store.settings.theme = "fifo-blue";
    store.settings.themeAuto = false;
    store.settings.notnew = "false";
    store.save();
  } else if (theme =="Lavender") {
    document.getElementsByClassName("Light")[0].classList.remove("active")
    document.getElementsByClassName("Blue")[0].classList.remove("active")
    document.getElementsByClassName("Dark")[0].classList.remove("active")
    document.getElementsByClassName("Lavender")[0].classList.add("active")
    store.settings.theme = "fifo-lavender";
    store.settings.themeAuto = false;
    store.settings.notnew = "false";
    store.save();
  }
}

const commit = () => {
  window.location.replace(getWebUIURL('newtab'))
}

const addDefault = () => {
  window.location.href = "ms-settings:defaultapps"
  nextPage()
}

export default observer(() => {

  window.onload = function() {
    page = 1
    document.getElementsByClassName("Dark")[0].classList.add("active")
    document.getElementsByClassName("banner1")[0].classList.add("active")
    // console.log(await defaultBrowser());

  }

  return (
    <ThemeProvider theme={{ ...store.theme }} style={{position: 'relative'}}>
      <WebUIStyle />


      <StyledSection className="banner1">
        <Description>Welcome to Fifo</Description>
        <Title>Let's get started!</Title>
        <Button theme={store.theme} onClick={nextPage}>Start!</Button>
      </StyledSection>

      <StyledSection className="banner2">
        <Favicon></Favicon>
        <Description style={{fontSize: "1.5rem", fontWeight: 500, margin: 0, marginBottom: "48px", opacity: '1' }}>Pick a theme!</Description>
        <div style={{ display: 'flex', width: "550px", justifyContent: "space-around" }}>
          <Option onClick={() => themeset("Light")} className="Light">
            <div style={{ border: "1px solid rgb(95, 99, 104)", backgroundColor: "#fff", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Light
            </div>
          </Option>
          <Option onClick={() => themeset("Dark")} className="Dark">
            <div style={{ border: "1px solid rgb(95, 99, 104)", backgroundColor: "rgb(95, 99, 104)", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Dark
            </div>
          </Option>
          <Option onClick={() => themeset("Blue")} className="Blue">
            <div style={{ border: "1px solid #0000FF", backgroundColor: "#0026ff", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Blue
            </div>
          </Option>
          <Option onClick={() => themeset("Lavender")} className="Lavender">
            <div style={{ border: "1px solid rgb(95, 99, 104)", backgroundColor: "#b500fc", borderRadius: "50%", display: "flex", height: "3rem", marginBottom: ".50rem", width: "3rem" }}></div>
            <div>
              Lavender
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

       <StyledSection className="banner3">
        <Favicon></Favicon>
        <Title>Fifo Setup</Title>
        <Description style={{fontSize: "1.5rem", fontWeight: 500, margin: 0, marginBottom: "48px", opacity: '1' }}>For maximum privacy, set Fifo as your default browser!</Description>
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
      </StyledSection>

      <StyledSection className="banner4">
        <Description>Fifo is the new privacy orientated browser!</Description>
        <Title>Inbuilt adblocker and more, lets start.</Title>
        <Button theme={store.theme} onClick={commit}>Lets get started!</Button>
      </StyledSection>
    </ThemeProvider>
  );
});
