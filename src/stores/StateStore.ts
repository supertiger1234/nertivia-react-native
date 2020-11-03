import {makeAutoObservable} from 'mobx';
import {Navigation} from 'react-native-navigation';

export interface IStateStore {
  lastNotificationData: string | null;
  changeLastNotificationData: (data: any) => void;
  leftDrawerVisible: Boolean;
  setLeftDrawerVisible: (visible: any, applyAction?: boolean) => void;
  selectedTab: string;
  setSelectedTab: (val: string) => void;
  selectedServerID: string | null;
  setSelectedServerID: (serverID: string) => void;
  selectedChannelID: string | null;
  setSelectedChannelID: (channelID: string) => void;
}

export class StateStore implements IStateStore {
  lastNotificationData = 'Hello World';
  leftDrawerVisible = false;
  selectedTab = 'DMs';
  selectedServerID: string | null = null;
  selectedChannelID: string | null = null;
  constructor() {
    makeAutoObservable(this);
  }
  changeLastNotificationData = (data: any) => {
    this.lastNotificationData = data;
  };

  setLeftDrawerVisible(visible: boolean, applyAction = true) {
    this.leftDrawerVisible = visible;
    if (applyAction) {
      Navigation.mergeOptions('DRAWERS', {
        sideMenu: {
          left: {
            visible: visible,
          },
        },
      });
    }
  }
  setSelectedTab(val: string) {
    this.selectedTab = val;
  }
  setSelectedServerID(serverID: string) {
    this.selectedServerID = serverID;
  }
  setSelectedChannelID(channelID: string) {
    this.selectedChannelID = channelID;
  }
}
