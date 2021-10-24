import { RpcMainEvent, RpcMainHandler } from '@wexond/rpc-electron';
import { networkMainChannel, NetworkService } from '~/common/rpc/network';
import { requestURL } from './request';

export class NetworkServiceHandler implements RpcMainHandler<NetworkService> {
  private static instance?: NetworkServiceHandler;

  public static get() {
    console.log(this.instance);
    if (!this.instance) this.instance = new NetworkServiceHandler();
    return this.instance;
  }

  constructor() {
    networkMainChannel.getReceiver().handler = this;
  }

  request(e: RpcMainEvent, url: string) {
    try {
      console.log(url);
      return requestURL(url);
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }
}
