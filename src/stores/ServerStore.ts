import {makeAutoObservable} from 'mobx';

interface Server {
  avatar: string;
  banner: string;
  creator: {
    uniqueID: string;
  };
  default_channel_id: string;
  name: string;
  server_id: string;
  verified: boolean;
  channel_position?: string[];
}

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
