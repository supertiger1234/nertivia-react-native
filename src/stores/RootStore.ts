import {IMeStore, MeStore} from './MeStore';
import {IStateStore, StateStore} from './StateStore';
import React from 'react';

export interface RootStoreInterface {
  stateStore: IStateStore;
  meStore: IMeStore;
}

export class RootStore {
  stateStore: IStateStore;
  meStore: IMeStore;

  constructor() {
    this.stateStore = new StateStore();
    this.meStore = new MeStore();
  }
}

export const store = new RootStore();

export const storeContext = React.createContext(store);
