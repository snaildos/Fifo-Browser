/* Copyright (c) 2021-2022 SnailDOS */

export type TabEvent =
  | 'load-commit'
  | 'url-updated'
  | 'title-updated'
  | 'favicon-updated'
  | 'did-navigate'
  | 'loading'
  | 'pinned'
  | 'credentials'
  | 'blocked-ad'
  | 'zoom-updated'
  | 'media-playing'
  | 'media-paused';
