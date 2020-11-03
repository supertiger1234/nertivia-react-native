import {makeAutoObservable} from 'mobx';
import Channel from '../interfaces/Channel';

interface ChannelObj {
  [key: string]: Channel;
}

export interface IChannelStore {
  channels: ChannelObj;
  initChannels: (data: ChannelObj) => void;
  serverChannels: (id: string) => Channel[];
}

export class ChannelStore implements IChannelStore {
  channels: ChannelObj = {};

  get serverChannels() {
    return (id: string) =>
      Object.values(this.channels).filter((c) => {
        if (c.server_id) {
          return c.server_id === id;
        } else {
          return false;
        }
      });
  }

  constructor() {
    makeAutoObservable(this);
  }
  initChannels = (data: ChannelObj) => {
    this.channels = data;
  };
}
