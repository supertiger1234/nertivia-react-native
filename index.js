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
    Navigation.setRoot({
      root: {
        sideMenu: {
          id: 'DRAWERS',
          options: {
            sideMenu: {
              left: {
                width: 300,
              },
            },
            statusBar: {
              drawBehind: true,
              backgroundColor: 'transparent',
            },
          },
          left: {
            component: {
              id: 'LEFT_DRAWER',
              name: 'com.nertivia.LeftDrawer',
              options: {
                statusBar: {
                  drawBehind: true,
                  backgroundColor: 'transparent',
                },
              },
            },
          },
          center: {
            component: {
              id: 'CENTER_APP',
              name: 'com.nertivia.App',
              options: {
                statusBar: {
                  drawBehind: true,
                  backgroundColor: 'transparent',
                },
              },
            },
          },
        },
      },
    });
  } else {
    Navigation.setRoot({
      root: {
        component: {
          name: 'com.nertivia.LoginScreen',
        },
      },
    });
  }
});
