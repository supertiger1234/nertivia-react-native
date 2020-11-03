import {makeAutoObservable} from 'mobx';
import Server from '../interfaces/Server';

interface ServerObj {
  [key: string]: Server;
}

export interface IServerStore {
  servers: ServerObj;
  initServer: (data: ServerObj) => void;
}

export class ServerStore implements IServerStore {
  servers: ServerObj = {};
  constructor() {
    makeAutoObservable(this);
  }
  initServer = (data: ServerObj) => {
    this.servers = data;
  };
}
