/* Copyright (c) 2021-2022 SnailDOS */

import styled, { css } from 'styled-components';

import { centerIcon, shadows } from '~/renderer/mixins';
import { ItemBase } from '../TopSites/style';

export const Item = styled(ItemBase)<{
  backgroundColor: string;
}>`
  transition: 0.2s box-shadow, 0.2s background-color;
  cursor: pointer;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  backdrop-filter: blur(8px);
  position: relative;
  z-index: 1;

  ${({ backgroundColor }) => css`
    background-color: ${backgroundColor};
    animation: all 5s infinite;
    &:hover {
      top: -2.5px;
      box-shadow: ${shadows(8)};
      background-color: ${backgroundColor};
    }
  `};
`;

export const AddItem = styled(Item)`
  ${centerIcon(36)};
`;

interface IconProps {
  add?: boolean;
  icon?: string;
  custom?: boolean;
}

export const Icon = styled.div<IconProps>`
  ${centerIcon()};
  position: relative;

  ${({
    add,
    icon,
    custom
  }) => css`
    height: ${add ? 32 : 24}px;
    width: ${add ? 32 : 24}px;
    background-image: url(${icon});
    opacity: ${add || custom ? 0.54 : 1};
    display: flex;
    justify-content: center;
    align-items: center;

    &:before {
      content: '';
      position: absolute;
      left: -6px;
      top: -6px;
      right: -6px;
      bottom: -6px;
      opacity: 0.3;
      background-color: ${add ? 'transparent' : 'white'};
      z-index: -1;
      border-radius: 50%;
    }

    &:before {
      left: ${add ? -4 : -6}px;
      top: ${add ? -4 : -6}px;
      right: ${add ? -4 : -6}px;
      bottom: ${add ? -4 : -6}px;
    }
  `}
`;

export const Title = styled.div`
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
  max-width: calc(100% - 16px);
  margin-top: 20px;
  margin-bottom: -8px;
  opacity: 0.87;
`;
