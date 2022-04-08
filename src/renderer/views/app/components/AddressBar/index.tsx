/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { isURL } from '~/utils';
import { callViewMethod } from '~/utils/view';
import { ipcRenderer } from 'electron';
import { ToolbarButton } from '../ToolbarButton';
import { StyledAddressBar, InputContainer, Input, Text } from './style';
import { ICON_SEARCH } from '~/renderer/constants';
import { SiteButtons } from '../SiteButtons';
import { DEFAULT_TITLEBAR_HEIGHT } from '~/constants/design';
import { NEWTAB_URL } from '~/constants/tabs';

let mouseUpped = false;

const onMouseDown = (e: React.MouseEvent<HTMLInputElement>) => {
  e.stopPropagation();

  if (!store.isCompact) return;

  store.addressbarTextVisible = false;
  store.addressbarFocused = true;
};

const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  store.addressbarTextVisible = false;
  store.addressbarFocused = true;

  if (store.tabs.selectedTab) {
    store.tabs.selectedTab.addressbarFocused = true;
  }

  if (store.isCompact) {
    // ipcRenderer.send(`window-fix-dragging-${store.windowId}`);
    e.currentTarget.select();
  }
};

const onSelect = (e: React.MouseEvent<HTMLInputElement>) => {
  if (store.tabs.selectedTab) {
    store.tabs.selectedTab.addressbarSelectionRange = [
      e.currentTarget.selectionStart,
      e.currentTarget.selectionEnd,
    ];
  }
};

const onMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
  if (
    !store.isCompact &&
    window.getSelection().toString().length === 0 &&
    !mouseUpped
  ) {
    e.currentTarget.select();
  }

  mouseUpped = true;
};

const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Escape' || e.key === 'Enter') {
    store.tabs.selectedTab.addressbarValue = null;
  }

  if (e.key === 'Escape') {
    const target = e.currentTarget;
    requestAnimationFrame(() => {
      target.select();
    });
  }

  if (e.key === 'Enter') {
    store.addressbarFocused = false;
    e.currentTarget.blur();
    const { value } = e.currentTarget;
    let url = value;
    if (value.trim() === '') {
      callViewMethod(store.tabs.selectedTabId, 'loadURL', NEWTAB_URL);
      return;
    } else if (isURL(value)) {
      url =
        value.indexOf('://') === -1
          ? value.startsWith('localhost')
            ? `http://${value}`
            : `https://${value}`
          : value;
    } else {
      url = store.settings.searchEngine.url.replace('%s', value);
    }

    store.tabs.selectedTab.addressbarValue = url;
    callViewMethod(store.tabs.selectedTabId, 'loadURL', url);
  }
};

let addressbarRef: HTMLDivElement;

const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  store.tabs.selectedTab.addressbarValue = '';

  const { left, width } = addressbarRef.getBoundingClientRect();

  if (e.currentTarget.value.trim() !== '') {
    ipcRenderer.send(`search-show-${store.windowId}`, {
      text: e.currentTarget.value,
      cursorPos: e.currentTarget.selectionStart,
      x: left,
      y: !store.isCompact ? DEFAULT_TITLEBAR_HEIGHT : 0,
      width: width,
    });
    store.addressbarEditing = true;
  }
};

const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.blur();
  window.getSelection().removeAllRanges();
  store.addressbarTextVisible = true;
  store.addressbarFocused = false;
  mouseUpped = false;

  // if (store.isCompact && !store.addressbarEditing)
  //   ipcRenderer.send(`window-fix-dragging-${store.windowId}`);

  const { selectedTab } = store.tabs;

  if (selectedTab) {
    selectedTab.addressbarFocused = false;
  }
};

export const AddressBar = observer(() => {
  const searchEngine = React.useMemo(() => {
    try {
      const url = new URL(store.addressbarValue);
      const searchParams = new URLSearchParams(url.search);
      switch (url.hostname.replace('www.', '')) {
        case 'duckduckgo.com':
          return searchParams.get('q');
        case 'google.com':
          return searchParams.get('q');
        case 'bing.com':
          return searchParams.get('q');
        case 'yahoo.com':
          return searchParams.get('p');
        case 'ecosia.org':
          return searchParams.get('q');
        case 'startpage.com':
          return searchParams.get('q');
        case 'qwant.com':
          return searchParams.get('q');
        case 'swisscows.com':
          return searchParams.get('q');
        case 'ekoru.org':
          return searchParams.get('q');
      }
    } catch {
      return undefined;
    }
    return undefined;
  }, [store.addressbarValue]);
  const searchValue = React.useMemo(() => {
    return searchEngine ?? store.addressbarValue;
  }, [store.addressbarValue]);
  return (
    <StyledAddressBar
      ref={(r) => (addressbarRef = r)}
      focus={store.addressbarFocused}
      color={store.tabs.selectedTab?.color}
    >
      <ToolbarButton
        toggled={false}
        icon={ICON_SEARCH}
        size={16}
        dense
        inhertTextColor
        iconStyle={{ transform: 'scale(-1,1)' }}
      />
      <InputContainer>
        <Input
          ref={(r) => (store.inputRef = r)}
          spellCheck={false}
          onKeyDown={onKeyDown}
          onMouseDown={onMouseDown}
          onSelect={onSelect}
          onBlur={onBlur}
          onFocus={onFocus}
          onMouseUp={onMouseUp}
          onChange={onChange}
          placeholder="Search or type in a URL"
          visible={!store.addressbarTextVisible || searchValue === ''}
          value={searchValue}
        ></Input>
        <Text visible={store.addressbarTextVisible && searchValue !== ''}>
          {searchEngine ? (
            <div>{searchValue}</div>
          ) : (
            store.addressbarUrlSegments.map((item, key) => (
              <div
                key={key}
                style={{
                  opacity: item.grayOut ? 0.54 : 1,
                }}
              >
                {item.value}
              </div>
            ))
          )}
        </Text>
      </InputContainer>
      {!store.isCompact && <SiteButtons />}
    </StyledAddressBar>
  );
});