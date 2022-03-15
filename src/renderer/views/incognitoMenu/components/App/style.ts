/* Copyright (c) 2021-2022 SnailDOS */

import styled, { css } from 'styled-components';
import { DialogStyle } from '~/renderer/mixins/dialogs';
import { ICON_ARROW_RIGHT } from '~/renderer/constants/icons';
import { ITheme } from '~/interfaces';
import { centerIcon } from '~/renderer/mixins';

export const StyledApp = styled(DialogStyle)`
  height: 150px;
`;

export const Title = styled.div`
  font-size: 16px;
`;

export const Subtitle = styled.div`
  font-size: 13px;
  opacity: 0.54;
  margin-top: 8px;
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: 16px;
  float: right;
`;

export const Line = styled.div`
  height: 1px;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;

  ${({ theme }: { theme?: ITheme }) => css`
    background-color: ${theme['dialog.separator.color']};
  `};
`;

export const MenuItem = styled.div`
  height: 40px;
  align-items: center;
  display: flex;
  position: relative;
  padding: 0 12px;
  font-size: 12px;
  cursor: pointer;

  ${({ arrow }: { arrow?: boolean; disabled?: boolean }) =>
    arrow &&
    css`
      &:after {
        content: '';
        position: absolute;
        right: 4px;
        width: 24px;
        height: 100%;
        opacity: 0.54;
        ${centerIcon(20)};
        background-image: url(${ICON_ARROW_RIGHT});
        ${({ theme }: { theme?: ITheme }) => css`
          filter: ${theme['dialog.lightForeground'] ? 'invert(100%)' : 'none'};
        `};
      }
    `};

  ${({ disabled }: { arrow?: boolean; disabled?: boolean }) =>
    css`
      pointer-events: ${disabled ? 'none' : 'inherit'};
      opacity: ${disabled ? 0.54 : 1};
    `};

  &:hover {
    ${({ theme }: { theme?: ITheme }) => css`
      background-color: ${theme['dialog.lightForeground']
        ? 'rgba(255, 255, 255, 0.06)'
        : 'rgba(0, 0, 0, 0.03)'};
    `};
  }
`;

export const MenuItemTitle = styled.div`
  flex: 1;
`;

export const MenuItems = styled.div`
  flex: 1;
  padding-top: 4px;
  padding-bottom: 4px;
  margin-top: 5px;

  ${({ theme }: { theme?: ITheme }) => css`
    background-color: ${theme['dialog.backgroundColor']};
    color: ${theme['dialog.textColor']};
  `};
`;

export const Content = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  width: 100%;
  height: 100px;
  align-content: center;
  justify-content: center;
`;

export const Text = styled.div`
  text-align: center;
`

export const Close = styled.div`
  margin-top: 20px;
  background: #fff;
`

export const Icon = styled.div`
  margin-right: 12px;
  width: 50px;
  height: 50px;
  ${centerIcon()};
  opacity: 0.8;
  margin: 0 auto;


  ${({ icon, theme }: { icon?: string; theme?: ITheme }) => css`
    background-image: url(${icon});
    filter: ${theme['dialog.lightForeground'] ? 'invert(100%)' : 'none'};
  `};
`;

export const MenuItemIcon = styled.div`
  margin-right: 12px;
  width: 21px;
  height: 21px;
  ${centerIcon()};
  opacity: 0.8;
  margin: 0 10px 0 0;


  ${({ icon, theme }: { icon?: string; theme?: ITheme }) => css`
    background-image: url(${icon});
    filter: ${theme['dialog.lightForeground'] ? 'invert(100%)' : 'none'};
  `};
`;

export const RightControl = styled.div`
  margin-right: 18px;
`;

export const Shortcut = styled(RightControl)`
  opacity: 0.54;
`;
