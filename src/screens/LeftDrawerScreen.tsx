import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import DrawerSideBar from '../components/DrawerSideBar';
import ServerDrawer from '../components/ServerDrawer';
import {RootStoreInterface, store, storeContext} from '../stores/RootStore';
import style from '../style';

@observer
export default class LeftDrawer extends Component {
  static contextType = storeContext;
  componentDidMount() {
    Navigation.showOverlay({
      component: {
        id: 'DRAWER_NAV',
        options: {
          statusBar: {
            drawBehind: true,
            backgroundColor: 'transparent',
          },
          overlay: {
            interceptTouchOutside: false,
          },
        },
        name: 'com.nertivia.DrawerNav',
      },
    });
  }
  get store() {
    return this.context as RootStoreInterface;
  }
  get currentTab() {
    return this.store.stateStore.selectedTab;
  }
  get selectedServerID() {
    return this.store.stateStore.selectedServerID;
  }
  get me() {
    return this.store.meStore.user;
  }
  render() {
    return (
      <View style={[style.backgroundColor, styleSheet.container]}>
        <DrawerSideBar />
        {this.currentTab === 'Servers' && this.selectedServerID && (
          <ServerDrawer key={this.selectedServerID} />
        )}
      </View>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
