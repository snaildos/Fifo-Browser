/* Copyright (c) 2021-2022 SnailDOS */

import { RpcMainEvent, RpcMainHandler } from '@wexond/rpc-electron';
import { networkMainChannel, NetworkService } from '~/common/rpc/network';
import { requestURL } from './request';

export class NetworkServiceHandler implements RpcMainHandler<NetworkService> {
  private static instance?: NetworkServiceHandler;

  public static get() {
    if (!this.instance) this.instance = new NetworkServiceHandler();
    return this.instance;
  }

  constructor() {
    networkMainChannel.getReceiver().handler = this;
  }

  request(e: RpcMainEvent, url: string) {
    try {
      return requestURL(url);
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }
}