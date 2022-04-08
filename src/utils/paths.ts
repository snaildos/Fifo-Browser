/* Copyright (c) 2021-2022 SnailDOS */

import { resolve } from 'path';
import { app } from 'electron';

export const getPath = (...relativePaths: string[]) => {
  let path: string;

  if (process.type !== 'browser') {
    path = require('@electron/remote').app.getPath('userData');
  } else if (app) {
    path = app.getPath('userData');
  } else {
    return null;
  }

  return resolve(path, ...relativePaths).replace(/\\/g, '/');
};