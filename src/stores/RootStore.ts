import {IMeStore, MeStore} from './MeStore';
import {IStateStore, StateStore} from './StateStore';
import React from 'react';
import {IServerStore, ServerStore} from './ServerStore';

export interface RootStoreInterface {
  stateStore: IStateStore;
  meStore: IMeStore;
  serverStore: IServerStore;
}

export class RootStore {
  stateStore: IStateStore;
  meStore: IMeStore;
  serverStore: IServerStore;

  constructor() {
    this.stateStore = new StateStore();
    this.meStore = new MeStore();
    this.serverStore = new ServerStore();
  }
}

export const store = new RootStore();

export const storeContext = React.createContext(store);
