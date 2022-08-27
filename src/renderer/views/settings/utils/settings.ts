/* Copyright (c) 2021-2022 SnailDOS */

import store from '../store';

export const onSwitchChange = (key: string) => () => {
  (store.settings as any)[key] = !(store.settings as any)[key];
  store.save();
};

export const alertSwitchChange = (key: string) => () => {
  (store.settings as any)[key] = !(store.settings as any)[key];
  store.save();
  alert('Please restart Fifo for this setting to be applied.');
};

export const newTabSwitchChange = (key: string) => () => {
  (store.settings.newtab as any)[key] = !(store.settings.newtab as any)[key];
  store.save();
};
