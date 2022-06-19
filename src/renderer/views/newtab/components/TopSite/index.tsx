/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Item, Icon, Title } from './style';
import { IHistoryItem } from '~/interfaces';
import { ICON_PAGE } from '~/renderer/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const onClick = (url: string) => () => {
  if (url !== '' && url != null) {
    window.location.href = url;
  }
};

export const TopSite = observer(
  ({
    item,
    backgroundColor,
  }: {
    item?: IHistoryItem;
    backgroundColor: string;
  }) => {
    const { title, favicon, url } = item || {};
    const custom = favicon === '' || favicon == null;

    let fav: string | IconProp = ICON_PAGE;

    if (!custom) {
      fav = favicon;
    }

    return (
      <Item
        onClick={onClick(url)}
        backgroundColor={backgroundColor}
      >
        <Icon
          icon={typeof fav === 'string' ? fav : ''}
        >
          {typeof fav !== 'string' && <FontAwesomeIcon icon={fav} />}
        </Icon>
        {title && <Title>{title}</Title>}
      </Item>
    );
  },
);
