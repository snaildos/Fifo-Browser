/* Copyright (c) 2021-2022 SnailDOS */

import * as React from 'react';
import { observer } from 'mobx-react-lite';
import {
  StyledDownloadItem,
  Title,
  Progress,
  ProgressBackground,
  Info,
  Icon,
  MoreButton,
  Separator,
  SecondaryText,
} from './style';
import { IDownloadItem } from '~/interfaces';
import prettyBytes = require('pretty-bytes');
import { shell, remote } from 'electron';

const onClick = (item: IDownloadItem) => () => {
  if (item.completed) {
    shell.openPath(item.savePath);
  }
};

const onMoreClick = (item: IDownloadItem) => (
  e: React.MouseEvent<HTMLDivElement>,
) => {
  e.stopPropagation();

  // const { top, left, x, y } = e.currentTarget.getBoundingClientRect();
  // const menu = remote.Menu.buildFromTemplate([
  //   {
  //     label: "Abrir",
  //     click: () => {
  //       onClick(item)
  //     }
  //   }
  // ]);

  // menu.popup({});
};

export const DownloadItem = observer(({ item }: { item: IDownloadItem }) => {
  let received = prettyBytes(item.receivedBytes);
  const total = prettyBytes(item.totalBytes);

  const receivedSplit = received.split(' ');

  if (receivedSplit[1] === total.split(' ')[1]) {
    received = receivedSplit[0];
  }

  return (
    <StyledDownloadItem style={{ cursor: 'pointer' }} onClick={onClick(item)}>
      <Icon ext={item.fileName.indexOf('.') > -1 ? item.fileName.split(".")[item.fileName.split(".").length - 1] : "none"}></Icon>
      <Info>
        <Title>{item.fileName}</Title>
        {!item.completed && (
          <>
            <ProgressBackground>
              <Progress
                style={{
                  width: `calc((${item.receivedBytes} / ${item.totalBytes}) * 100%)`,
                }}
              ></Progress>
            </ProgressBackground>
            <SecondaryText>{`${received}/${total}`}</SecondaryText>
          </>
        )}
      </Info>
      <Separator></Separator>
      <MoreButton onClick={onMoreClick(item)}></MoreButton>
    </StyledDownloadItem>
  );
});
