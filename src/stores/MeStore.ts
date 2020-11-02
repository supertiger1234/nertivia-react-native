import {makeAutoObservable} from 'mobx';

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
}

export class MeStore implements IMeStore {
  user: User = {};
  constructor() {
    makeAutoObservable(this);
  }
  initUser = (data: User) => {
    this.user = data;
  };
}
