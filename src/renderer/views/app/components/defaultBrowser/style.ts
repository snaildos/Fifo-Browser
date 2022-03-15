/* Copyright (c) 2021-2022 SnailDOS */

import styled, { css } from 'styled-components';
import { Button } from '../ToolbarButton/style';
import { ITheme } from '~/interfaces';
import {
  robotoRegular,
  centerVertical,
  robotoMedium,
  centerIcon,
  coloredCursor,
} from '~/renderer/mixins';
import { transparency, EASING_FUNCTION, BLUE_500, LIGHT_BLUE_500 } from '~/renderer/constants';

export const StyledDefaultBrowser = styled.div`
  position: relative;
  /* z-index: 100; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-flow: row;
  width: 100%;
  min-height: 50px;
  padding: 2px 8px 0;
  padding-top: 0px;
  padding-right: 4px;

  ${({ theme }: { theme: ITheme }) => css`
    margin-top: ${theme.isCompact ? 0 : -1}px;
    background-color: ${theme.isCompact
      ? theme['titlebar.backgroundColor']
      : theme['toolbar.backgroundColor']};
    border-bottom: 1px solid
      ${theme.isCompact
        ? 'transparent'
        : theme['toolbar.bottomLine.backgroundColor']};
    color: ${theme['addressbar.textColor']};
  `};
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;

  ${({ theme }: { theme?: ITheme }) => css`
    background-color: ${theme['dialog.separator.color']};
  `};
`;

export const StyledDefaultBrowserSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-flow: row;
  overflow: hidden;
  height: 100%;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
`;

export const HiddenDiv = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: transparent;
`

export const ButtonPredeterminado = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: .2s;
  /* margin: 2.5px 0 0 0; */
  margin-left: 25px;
  font-size: 12px;
  font-weight: 500;
  width: auto;
  min-width: 200px;
  
  ${({ theme }: { theme?: ITheme }) => css`
    background: ${theme['addressbar.textColor'] == "#fff" ? "#8ab4f8" : "#267ae9"};
    color: ${theme['addressbar.textColor'] == "#fff" ? "black" : "white"};

    &:hover {
      background: ${theme['addressbar.textColor'] == "#fff" ? "#8fb7f8" : "#267adf"};
    }
  `};
`;

export const Close = styled.div`
  width: 18px;
  height: 18px;
  opacity: ${transparency.icons.inactive};
  margin-left: 16px;
  cursor: pointer;
  padding: 10px;
  margin-right: 1.5%;
  ${centerIcon('contain')};

  ${({ icon, theme }: { icon: string; theme?: ITheme }) => css`
    background-image: url(${icon});
    filter: ${theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
  `};

  &:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;