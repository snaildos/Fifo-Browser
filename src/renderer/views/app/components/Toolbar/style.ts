/* Copyright (c) 2021-2022 SnailDOS */

import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { TOOLBAR_HEIGHT } from '~/constants/design';

export const StyledToolbar = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  flex-flow: row;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: ${TOOLBAR_HEIGHT}px;
  transition: background-color 0.4s, color 0.4s;
  transition-timing-function: ease-out;

  ${({ theme }: { theme: ITheme }) => css`
    background-color: ${theme['toolbar.backgroundColor']};
    border-bottom: 1px solid ${theme['toolbar.bottomLine.backgroundColor']};
  `};
`;
