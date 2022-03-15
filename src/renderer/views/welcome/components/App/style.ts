/* Copyright (c) 2021-2022 SnailDOS */

import styled, { css } from 'styled-components';
import { shadows } from '~/renderer/mixins';
import { ITheme } from '~/interfaces';
import { DIALOG_BORDER_RADIUS } from '~/renderer/mixins/dialogs';
import { centerIcon } from '~/renderer/mixins';
import {
  FAVICON as favicon,
} from '~/renderer/constants/icons';

export const StyledSection = styled.div`
  width: 100%;
  height: 100vh;
  display: none;
  transform: translateX(-1000px);
  /* display: flex; */
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &.active {
    display: flex;
    animation: slide-in 1.5s forwards;
  }


  &.disabled {
    display: flex;
    position: absolute;
    animation: slide-out 30s forwards;
  }

  @keyframes slide-in {
    0% {
      transform: translateX(-1000px);
    } 100% {
      transform: translateX(0);
    }
  }

  @keyframes slide-out {
    0% {
      transform: translateX(0);
    } 100% {
      transform: translateX(100000px);
    }
  }
`;

export const Button = styled.div`
  -webkit-tap-highlight-color: transparent;
  align-items: center;
  border: 1px solid rgb(138, 180, 248);
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  font-weight: 500;
  height: 32px;
  justify-content: center;
  min-width: 5.14em;
  outline-width: 0;
  padding: 8px 16px;
  position: relative;
  user-select: none;
  background: rgb(138, 180, 248);
  font-size: 1rem;
  height: 3rem;
  padding-bottom: 12px;
  padding-top: 12px;
  text-align: center;
  white-space: nowrap;
  width: 256px;

  ${({ theme }: { theme?: ITheme }) => css`
    color: ${theme['pages.textColor'] == "#fff" ? "black" : "white"}};
  `};

  &:hover {
    background: rgba(138, 180, 248, .8);
  }
`

export const Icon = styled.div`
  /* margin-right: 12px; */
  width: 20px;
  height: 20px;
  opacity: 0.8;
  margin: 0;
  ${centerIcon()};

  ${({ icon, theme }: { icon?: string, theme?: ITheme }) => css`
    background-image: url("${icon}");
    filter: ${theme['pages.textColor'] == "#fff" ? 'none' : 'invert(100%)'};
  `};
`;


export const Title = styled.div`
  font-size: 4rem;
  margin-bottom: 40px;
  margin-top: 16px;
  text-align: center;
  font-weight: bold;
`

export const Description = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2.25rem;
  margin: 0;
  opacity: 0.4;
  text-align: center;
`

export const StyledLink = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-top: 24px;
  -webkit-appearance: none;
  background: none;
  border: none;
  color: rgb(138, 180, 248);
  cursor: pointer;
  display: inline-block;
  font-family: inherit;
  text-decoration: none;
`

export const Favicon = styled.div`
  background: url('${favicon}');
  width: 40px;
  height: 40px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-bottom: 16px;
` 

export const Option = styled.div`
  -webkit-appearance: none;
  align-items: center;
  border-radius: 8px;
  box-sizing: border-box;
  display: inline-flex;
  font-family: inherit;
  height: 7.5rem;
  justify-content: center;
  outline: 0;
  position: relative;
  transition-duration: 500ms;
  transition-property: box-shadow;
  vertical-align: bottom;
  width: 6.25rem;

  border: 1px solid rgb(95, 99, 104);
  color: rgb(95, 99, 104);
  font-weight: 500;
  cursor: pointer;
  flex-direction: column;

  &.active {
    border: 1px solid rgb(138, 180, 248);
    color: rgb(138, 180, 248);
  }
`