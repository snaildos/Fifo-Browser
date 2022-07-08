/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store, { QuickRange } from '../../store';
import { NavigationDrawer } from '~/renderer/components/NavigationDrawer';
import { ThemeProvider } from 'styled-components';
import { SelectionDialog } from '~/renderer/components/SelectionDialog';
import { HistorySection } from '../HistorySection';
import { Container, Content, LeftContent } from '~/renderer/components/Pages';
import { GlobalNavigationDrawer } from '~/renderer/components/GlobalNavigationDrawer';
import { IHistorySection } from '~/interfaces';
import {
  ICON_HISTORY,
  ICON_ALL,
  ICON_TODAY,
  ICON_WEEK,
  ICON_CALENDAR,
  ICON_TRASH,
} from '~/renderer/constants';
import { WebUIStyle } from '~/renderer/mixins/default-styles';

const onScroll = (e: any) => {
  const scrollPos = e.target.scrollTop;
  const scrollMax = e.target.scrollHeight - e.target.clientHeight - 256;

  if (scrollPos >= scrollMax) {
    store.itemsLoaded += store.getDefaultLoaded();
  }
};

const RangeItem = observer(
  ({
    range,
    children,
    icon,
  }: {
    range: QuickRange;
    children: any;
    icon: string;
  }) => (
    <NavigationDrawer.Item
      onClick={() => (store.selectedRange = range)}
      selected={store.selectedRange === range}
      icon={icon}
    >
      {children}
    </NavigationDrawer.Item>
  ),
);

const onCancelClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  store.selectedItems = [];
};

const onDeleteClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  store.deleteSelected();
};

const HistorySections = observer(() => {
  return (
    <LeftContent style={{ margin: '32px 64px' }}>
      <SelectionDialog
        theme={store.theme}
        visible={store.selectedItems.length > 0}
        amount={store.selectedItems.length}
        onDeleteClick={onDeleteClick}
        onCancelClick={onCancelClick}
      />
      {store.sections.map((data) => (
        <HistorySection data={data} key={data.date.getTime()} />
      ))}
    </LeftContent>
  );
});

const onInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
  store.search(e.currentTarget.value);
};

const onClearClick = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  store.clear()

  // store.clear();
  // TODO: ipcRenderer.send('clear-browsing-data');
};

export default observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <Container>
        <WebUIStyle />
        <GlobalNavigationDrawer></GlobalNavigationDrawer>
        <NavigationDrawer title="Search History" search onSearchInput={onInput}>
          <RangeItem icon={ICON_ALL} range="all">
            All
          </RangeItem>
          <RangeItem icon={ICON_TODAY} range="today">
            Today
          </RangeItem>
          <RangeItem icon={ICON_HISTORY} range="yesterday">
            Yesterday
          </RangeItem>
          <RangeItem icon={ICON_WEEK} range="last-week">
            Last Week
          </RangeItem>
          <RangeItem icon={ICON_CALENDAR} range="older">
            Older
          </RangeItem>
          <div style={{ flex: 1 }} />
          <NavigationDrawer.Item icon={ICON_TRASH} onClick={onClearClick}>
           Clear search history
          </NavigationDrawer.Item>
          <p>Keep in mind, This button only clears search history, not favicons nor suggestions. Please go to settings for advance clear features.</p>
        </NavigationDrawer>
        <Content onScroll={onScroll}>
          <HistorySections />
        </Content>
      </Container>
    </ThemeProvider>
  );
});
