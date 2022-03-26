/* Copyright (c) 2021-2022 SnailDOS */

import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Preloader } from '~/renderer/components/Preloader';
import {
  StyledTab,
  StyledContent,
  StyledIcon,
  StyledTitle,
  StyledClose,
  StyledAction,
  StyledPinAction,
  TabContainer,
} from './style';
import { ICON_VOLUME_HIGH, ICON_VOLUME_OFF } from '~/renderer/constants';
import { ITab } from '../../models';
import store from '../../store';
import * as remote from '@electron/remote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const removeTab = (tab: ITab) => (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  tab.close();
};

const toggleMuteTab = (tab: ITab) => (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
  tab.isMuted ? store.tabs.unmuteTab(tab) : store.tabs.muteTab(tab);
};

const onCloseMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const onVolumeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  e.stopPropagation();
};

const onMouseDown = (tab: ITab) => (e: React.MouseEvent<HTMLDivElement>) => {
  const { pageX, button } = e;

  if (store.addressbarEditing) {
    store.inputRef.focus();
  }

  if (button === 0) {
    if (!tab.isSelected) {
      tab.select();
    } else {
      store.canOpenSearch = true;
    }

    store.tabs.lastMouseX = 0;
    store.tabs.isDragging = true;
    store.tabs.mouseStartX = pageX;
    store.tabs.tabStartX = tab.left;

    store.tabs.lastScrollLeft = store.tabs.containerRef.current.scrollLeft;
  }
};

const onClick = (tab: ITab) => (e: React.MouseEvent<HTMLDivElement>) => {
  if (e.button === 4) {
    tab.close();
    return;
  }

  if (store.isCompact && e.button === 0 && store.canOpenSearch) {
    store.inputRef.focus();
    store.canOpenSearch = false;
  }
};

const onMouseUp = (tab: ITab) => (e: React.MouseEvent<HTMLDivElement>) => {
  if (e.button === 1) {
    tab.close();
  }
};

const onContextMenu = (tab: ITab) => () => {
  const menu = remote.Menu.buildFromTemplate([
    {
      label: 'Add a tab to the left',
      click: () => {
        store.tabs.addTab(
          {
            index: store.tabs.list.indexOf(store.tabs.selectedTab) + 1,
          },
          tab.tabGroupId,
        );
      },
    },
    {
      label: 'Add to a new group',
      click: () => {
        const tabGroup = store.tabGroups.addGroup();
        tab.tabGroupId = tabGroup.id;
        store.tabs.updateTabsBounds(true);
      },
    },
    {
      label: 'Remove from a group',
      visible: !!tab.tabGroup,
      click: () => {
        tab.removeFromGroup();
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Reload',
      accelerator: 'CmdOrCtrl+R',
      click: () => {
        tab.callViewMethod('webContents.reload');
      },
    },
    {
      label: 'Duplicate',
      click: () => {
        store.tabs.addTab({ active: true, url: tab.url });
      },
    },
    {
      label: tab.isPinned ? 'Unpin Tab' : 'Pin tab',
      click: () => {
        tab.isPinned ? store.tabs.unpinTab(tab) : store.tabs.pinTab(tab);
      },
    },
    {
      label: tab.isMuted ? 'Unmute window' : 'Mute window',
      click: () => {
        tab.isMuted ? store.tabs.unmuteTab(tab) : store.tabs.muteTab(tab);
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Close the tab',
      accelerator: 'CmdOrCtrl+W',
      click: () => {
        tab.close();
      },
    },
    {
      label: 'Close tabs in group',
      click: () => {
        for (const t of store.tabs.list) {
          if (t !== tab) {
            t.close();
          }
        }
      },
    },
    {
      label: 'Close tabs to the right',
      click: () => {
        for (let i = store.tabs.list.indexOf(tab) - 1; i >= 0; i--) {
          store.tabs.list[i].close();
        }
      },
    },
    {
      label: 'Close tabs to the right',
      click: () => {
        for (
          let i = store.tabs.list.length - 1;
          i > store.tabs.list.indexOf(tab);
          i--
        ) {
          store.tabs.list[i].close();
        }
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Revert closed tab',
      enabled: store.tabs.closedUrl !== '',
      click: () => {
        store.tabs.revertClosed();
      },
    },
  ]);

  menu.popup();
};


const Content = observer(({ tab }: { tab: ITab }) => {
  const favicon = React.useMemo(() => {
    if (!tab.favicon) return undefined;
    if (tab.favicon.startsWith('data:undefined')) return undefined;
    else return tab.favicon !== '' ? tab.favicon : undefined;
  }, [tab.favicon]);
  return (
    <StyledContent title={store.settings.object.invisibleTabs ? tab.url : null}>
      {!tab.loading && tab.favicon && (
        <StyledIcon
        isIconSet={favicon !== ''}
        style={{ backgroundImage: favicon ? `url(${favicon})` : '' }}
        >
          <PinnedVolume tab={tab} />
        </StyledIcon>
      )}
      {tab.loading && (
        <Preloader
          thickness={6}
          size={16}
          indeterminate
          style={{ minWidth: 16, marginRight: '8px' }}
        />
      )}
      {!tab.isPinned && (
        <StyledTitle isIcon={tab.isIconSet} selected={tab.isSelected}>
          {tab.isSelected && store.isCompact ? tab.url : tab.title}
        </StyledTitle>
      )}
      <ExpandedVolume tab={tab} />
      {!(store.settings.object.showTabOnClose && store.tabs.list.length == 1) && (
        <Close tab={tab} />
      )}
    </StyledContent>
  );
});


const ExpandedVolume = observer(({ tab }: { tab: ITab }) => {
  return (
    <StyledAction
      onMouseDown={onVolumeMouseDown}
      onClick={toggleMuteTab(tab)}
      visible={tab.isExpanded && !tab.isPinned && tab.isPlaying}
      icon={tab.isMuted ? ICON_VOLUME_OFF : ICON_VOLUME_HIGH}
    />
  );
});

const PinnedVolume = observer(({ tab }: { tab: ITab }) => {
  return (
    <StyledPinAction
      onMouseDown={onVolumeMouseDown}
      onClick={toggleMuteTab(tab)}
      visible={tab.isPinned && tab.isPlaying}
      icon={tab.isMuted ? ICON_VOLUME_OFF : ICON_VOLUME_HIGH}
    />
  );
});

const Close = observer(({ tab }: { tab: ITab }) => {
  return (
    <StyledClose
      onMouseDown={onCloseMouseDown}
      onClick={removeTab(tab)}
      visible={tab.isExpanded && !tab.isPinned}
      style={{ cursor: 'pointer' }}
      title={`Close Tab`}
    />
  );
});

export default observer(({ tab }: { tab: ITab }) => {
  const defaultColor = store.theme['toolbar.lightForeground']
    ? 'rgba(255, 255, 255, 0.04)'
    : 'rgba(255, 255, 255, 0.3)';

  const defaultHoverColor = store.theme['toolbar.lightForeground']
    ? 'rgba(255, 255, 255, 0.08)'
    : 'rgba(255, 255, 255, 0.5)';

  const defaultSelectedHoverColor = store.theme['toolbar.lightForeground']
    ? '#393939'
    : '#fcfcfc';

  const invisibleTabs = store.settings.object.invisibleTabs;
  // var dominant_color;

  // color.getDominantColor(tab.favicon).then(json => {
  //   if (json.dColor) {
  //     dominant_color = json.dColor
  //   }

  //   dominant_color = store.theme['toolbar.backgroundColor'];
  // }).catch(err => {
  //   dominant_color = store.theme['toolbar.backgroundColor'];
  // })

  return (
    <StyledTab
      selected={tab.isSelected}
      onMouseDown={onMouseDown(tab)}
      onMouseUp={onMouseUp(tab)}
      onContextMenu={onContextMenu(tab)}
      onClick={onClick(tab)}
      ref={tab.ref}
    >
      <TabContainer
        hasTabGroup={tab.tabGroupId !== -1}
        pinned={tab.isPinned}
        selected={tab.isSelected}
        style={{
          backgroundColor: tab.isSelected
            ? store.isCompact && tab.isHovered
              ? defaultSelectedHoverColor
              : store.theme['toolbar.backgroundColor']
            : invisibleTabs ? "transparent" :
            tab.isHovered
            ? defaultHoverColor
            : defaultColor,
          borderColor:
            tab.isSelected && tab.tabGroupId !== -1 && !store.isCompact
              ? tab.tabGroup.color
              : 'transparent',
        }}
      >
        <Content tab={tab} />
      </TabContainer>
    </StyledTab>
  );
});
