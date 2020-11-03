import {IMeStore, MeStore} from './MeStore';
import {IStateStore, StateStore} from './StateStore';
import React from 'react';
import {IServerStore, ServerStore} from './ServerStore';
import {ChannelStore, IChannelStore} from './ChannelStore';

export interface RootStoreInterface {
  stateStore: IStateStore;
  meStore: IMeStore;
  serverStore: IServerStore;
  channelStore: IChannelStore;
}

export class RootStore {
  stateStore: IStateStore;
  meStore: IMeStore;
  serverStore: IServerStore;
  channelStore: IChannelStore;

  constructor() {
    this.stateStore = new StateStore();
    this.meStore = new MeStore();
    this.serverStore = new ServerStore();
    this.channelStore = new ChannelStore();
  }
}

export const store = new RootStore();

export const storeContext = React.createContext(store);
