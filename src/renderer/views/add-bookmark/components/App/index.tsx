/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp, Title, Row, Label, Buttons, Col, Select } from './style';
import store from '../../store';
import { Input, Dropdown } from '~/renderer/components/Input';
import { Button } from '~/renderer/components/Button';
import { ipcRenderer } from 'electron';
import { getBookmarkTitle } from '~/renderer/views/bookmarks/utils';
import { UIStyle } from '~/renderer/mixins/default-styles';

const onDone = () => {
  store.hide();
};

const updateBookmark = () => {
  if (!store.bookmark) return;
  ipcRenderer.send('bookmarks-update', store.bookmark._id, store.bookmark);
};

const onChange = () => {
  if (!store.bookmark) return;

  store.bookmark.title = store.titleRef.current.value;
  updateBookmark();
};

const onRemove = () => {
  if (!store.bookmark) return;
  ipcRenderer.send('bookmarks-remove', [store.bookmark._id]);
  store.hide();
};

export const App = observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp visible={store.visible}>
        <UIStyle />
        <Title>{store.dialogTitle || 'New Bookmark'}</Title>
        <Col>
          <Label>Name</Label>
          <Input
            tabIndex={0}
            className="textfield"
            ref={store.titleRef}
            onChange={onChange}
          />
        </Col>
        <Col>
          <Label>Folder</Label>
          <Select
            onChange={(event) => {
              store.currentFolder = store.folders.find(
                (f) => f._id === event.target.value,
              );
              store.bookmark.parent = event.target.value;
              updateBookmark();
            }}
            theme={store.theme}
            value={store.currentFolder?._id}
          >
            {store.folders
              .filter((folder) => folder.isFolder)
              .map((folder) => (
                <option value={folder._id}>{getBookmarkTitle(folder)}</option>
              ))} 
          </Select>
        </Col>
        <Buttons>
          <Button onClick={onDone}>Done</Button>
          <Button
            onClick={onRemove}
            background={
              store.theme['dialog.lightForeground'] ? '#11151A' : '#F2F8FF'
            }
            foreground={
              store.theme['dialog.lightForeground'] ? 'white' : 'black'
            }
          >
            Remove
          </Button>
        </Buttons>
      </StyledApp>
    </ThemeProvider>
  );
});
