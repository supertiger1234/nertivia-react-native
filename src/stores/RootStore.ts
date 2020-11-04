import {IMeStore, MeStore} from './MeStore';
import {IStateStore, StateStore} from './StateStore';
import React from 'react';
import {IServerStore, ServerStore} from './ServerStore';
import {ChannelStore, IChannelStore} from './ChannelStore';
import {IMessageStore, MessageStore} from './MessageStore';

export interface RootStoreInterface {
  stateStore: IStateStore;
  meStore: IMeStore;
  serverStore: IServerStore;
  channelStore: IChannelStore;
  messageStore: IMessageStore;
}

export class RootStore {
  stateStore: IStateStore;
  meStore: IMeStore;
  serverStore: IServerStore;
  channelStore: IChannelStore;
  messageStore: IMessageStore;

  constructor() {
    this.stateStore = new StateStore();
    this.meStore = new MeStore();
    this.serverStore = new ServerStore();
    this.channelStore = new ChannelStore();
    this.messageStore = new MessageStore();
  }
}

export const store = new RootStore();

export const storeContext = React.createContext(store);
