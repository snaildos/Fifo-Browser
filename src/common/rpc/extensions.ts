/* Copyright (c) 2021-2022 SnailDOS */

import { RendererToMainChannel } from '@wexond/rpc-electron';

export interface ExtensionMainService {
  uninstall(id: string): void;
  inspectBackgroundPage(id: string): void;
}

export const extensionMainChannel = new RendererToMainChannel<ExtensionMainService>(
  'ExtensionMainService',
);
