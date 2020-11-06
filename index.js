import {AppRegistry, StatusBar} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {notificationClicked, onNotificationClick} from './FCM';
import {store} from './src/stores/RootStore';
import {Navigation} from 'react-native-navigation';
import LoginScreen from './src/screens/LoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LeftDrawer from './src/screens/LeftDrawerScreen';
import DrawerNav from './src/components/DrawerNav';
import {LogBox} from 'react-native';
import {loginPageOptions, mainPageOptions} from './src/utils/screens';
import ConnectionOverlay from './src/components/ConnectionOverlay';

// mute initial warning (websocket long intervals (fixed in connect event))
LogBox.ignoreLogs(['Setting a timer for a long period of']);

// getToken().then((token) => {
//   console.log(token);
// });

// run when app opened from quit
// notificationClicked().then((v) => {
//   store.stateStore.changeLastNotificationData('clicked');
// });

// when app resumed
// onNotificationClick((data) => {
//   store.stateStore.changeLastNotificationData('clicked');
// });

Navigation.setLazyComponentRegistrator((componentName) => {
  if (componentName === 'com.nertivia.LoginScreen') {
    Navigation.registerComponent('com.nertivia.LoginScreen', () => LoginScreen);
  }
});

Navigation.registerComponent('com.nertivia.App', () => App);
Navigation.registerComponent('com.nertivia.LeftDrawer', () => LeftDrawer);
Navigation.registerComponent('com.nertivia.DrawerNav', () => DrawerNav);
Navigation.registerComponent(
  'com.nertivia.ConnectionOverlay',
  () => ConnectionOverlay,
);

Navigation.events().registerComponentDidDisappearListener(
  ({componentId: compId}) => {
    if (compId === 'LEFT_DRAWER') {
      store.stateStore.setLeftDrawerVisible(false, false);
    }
  },
);
Navigation.events().registerComponentDidAppearListener(
  ({componentId: compId}) => {
    if (compId === 'LEFT_DRAWER') {
      store.stateStore.setLeftDrawerVisible(true, false);
    }
  },
);

Navigation.events().registerAppLaunchedListener(async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    Navigation.setRoot(mainPageOptions);
  } else {
    Navigation.setRoot(loginPageOptions);
  }
});
