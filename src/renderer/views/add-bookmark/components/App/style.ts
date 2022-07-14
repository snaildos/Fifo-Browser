/* Copyright (c) 2021-2022 SnailDOS */

import styled, { css } from 'styled-components';

import { ITheme } from '~/interfaces';
import { DialogStyle } from '~/renderer/mixins/dialogs';

interface AppProps {
  theme?: ITheme;
  visible: boolean;
}
export const StyledApp = styled(DialogStyle)<AppProps>`
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  ${({ theme }) => css`
    color: ${theme['dialog.lightForeground'] ? '#fff' : '#000'};
  `}
`;

export const Subtitle = styled.div`
  font-size: 13px;
  opacity: 0.54;
  margin-top: 8px;
`;

export const Title = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: bold;
`;

export const Row = styled.div`
  width: 100%;
  height: 48px;
  align-items: center;
  display: flex;
`;

export const Col = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const Label = styled.div`
  font-size: 13px;
  margin-bottom: 5px;
`;

export const Buttons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 6px;
  & .button:not(:last-child) {
    margin-right: 8px;
  }
`;

export const Select = styled.select<{
  theme: ITheme;
}>`
  height: 40px;
  min-width: 200px;
  position: relative;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  display: flex;
  border: 0;
  padding: 0.3rem;
  align-items: center;
  -webkit-appearance: none;
  ${({ theme }) => css`
    background-color: ${theme['control.backgroundColor']};

    &:hover {
      background-color: ${theme['control.hover.backgroundColor']};
    }
  `}
`;
