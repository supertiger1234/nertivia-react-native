import {makeAutoObservable} from 'mobx';
import {socketInstance} from '../socketio/socketIOInstance';

interface User {
  username?: string | null;
  tag?: string | null;
  email?: string | null;
  avatar?: string | null;
  uniqueID?: string | null;
}

export interface IMeStore {
  user: User;
  initUser: (data: User) => void;
  setConnectionDetails: (data: {
    connected: boolean;
    message?: string | null;
    socketID?: string;
  }) => void;
  connected: boolean;
  connectionMessage?: string | null;
  socketID?: string | undefined;
}

export class MeStore implements IMeStore {
  user: User = {};
  connected = false;
  socketID: string | undefined = undefined;
  connectionMessage?: string | null = 'Connecting...';
  constructor() {
    makeAutoObservable(this);
  }
  initUser = (data: User) => {
    this.user = data;
  };
  setConnectionDetails = (data: {
    connected: boolean;
    message?: string | null | undefined;
    socketID?: string;
  }) => {
    this.connected = data.connected;
    this.connectionMessage = data.message;
    this.socketID = data.socketID;
  };
}
