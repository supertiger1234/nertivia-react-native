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
        <View style={styleSheet.drawerContent}>
          <DrawerHeader />
          {this.currentTab === 'Servers' && this.selectedServerID && (
            <ServerDrawer key={this.selectedServerID} />
          )}
        </View>
      </View>
    );
  }
}

const DrawerHeader = () => {
  const safeTop = StaticSafeAreaInsets.safeAreaInsetsTop;
  let name = '';
  const selectedTab = store.stateStore.selectedTab;
  if (selectedTab === 'Servers' && store.stateStore.selectedServerID) {
    name = store.serverStore.servers?.[store.stateStore.selectedServerID]?.name;
  }
  return (
    <View style={[styleSheet.header, {paddingTop: safeTop}]}>
      <Text style={styleSheet.headerName}>{name || selectedTab}</Text>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  drawerContent: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 60,
    justifyContent: 'center',
  },
  headerName: {alignSelf: 'center', color: 'white'},
});
