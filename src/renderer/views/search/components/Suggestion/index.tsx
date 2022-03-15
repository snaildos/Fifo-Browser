/* Copyright (c) 2021-2022 SnailDOS */

import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { transparency, ICON_PAGE, ICON_SEARCH } from '~/renderer/constants';
import {
  StyledSuggestion,
  PrimaryText,
  Dash,
  SecondaryText,
  Icon,
  Url,
} from './style';
import { ISuggestion } from '~/interfaces';
import store from '../../store';
import { ipcRenderer } from 'electron';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { callViewMethod } from '~/utils/view';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  suggestion: ISuggestion;
}

const onMouseEnter = (suggestion: ISuggestion) => () => {
  suggestion.hovered = true;
};

const onMouseLeave = (suggestion: ISuggestion) => () => {
  suggestion.hovered = false;
};

const onClick = (suggestion: ISuggestion) => () => {
  let url = suggestion.isSearch ? suggestion.primaryText : suggestion.url;

  if (suggestion.isSearch) {
    url = store.searchEngine.url.replace('%s', url);
  } else if (url.indexOf('://') === -1) {
    url = `http://${url}`;
  }

  callViewMethod(store.tabId, 'loadURL', url);

  store.hide();
};

export const Suggestion = observer(({ suggestion }: Props) => {
  const { hovered } = suggestion;
  const { primaryText, secondaryText, url } = suggestion;

  const selected = store.suggestions.selected === suggestion.id;

  let { favicon } = suggestion;

  if (
    favicon == null ||
    (typeof favicon === 'string' && favicon.trim() === '')
  ) {
    favicon = ICON_PAGE;
  }

  const customFavicon = favicon !== ICON_PAGE && favicon !== ICON_SEARCH;

  return (
    <StyledSuggestion
      selected={selected}
      hovered={hovered}
      onClick={onClick(suggestion)}
      onMouseEnter={onMouseEnter(suggestion)}
      onMouseLeave={onMouseLeave(suggestion)}
    >
{typeof favicon === 'string' ? (
        <Icon
          style={{
            backgroundImage: `url(${favicon})`,
            opacity: customFavicon ? 1 : transparency.icons.inactive,
            filter: !customFavicon
              ? store.theme['searchBox.lightForeground']
                ? 'invert(100%)'
                : 'none'
              : 'none',
          }}
        />
      ) : (
        <Icon>
          <FontAwesomeIcon icon={favicon} fixedWidth />
        </Icon>
      )}
      {primaryText && <PrimaryText>{primaryText}</PrimaryText>}
      {primaryText && (secondaryText || url) && <Dash>&ndash;</Dash>}
      {url ? <Url>{url}</Url> : <SecondaryText>{secondaryText}</SecondaryText>}
    </StyledSuggestion>
  );
});
