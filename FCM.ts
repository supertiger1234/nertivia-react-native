import {NativeModules, NativeEventEmitter} from 'react-native';

const {FCMModule} = NativeModules;

export const getToken: () => Promise<String> = FCMModule.getToken;

export const eventEmitter = new NativeEventEmitter(FCMModule);

interface NotificationData {
  data: string;
}

export const notificationClicked: () => Promise<NotificationData | null> =
  FCMModule.notificationClicked;

export function onNotificationClick(callback: (data: NotificationData) => {}) {
  const ev = eventEmitter.addListener('onNotificationClick', (event) => {
    callback(event);
  });
  return ev;
}
