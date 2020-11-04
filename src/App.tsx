import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import MessageArea from './components/MessageArea';

import {socketInstance} from './socketio/socketIOInstance';
import {RootStoreInterface, store, storeContext} from './stores/RootStore';
import style from './style';

@observer
export default class App extends Component {
  static contextType = storeContext;
  componentDidMount() {
    // connects
    socketInstance();
  }
  get store() {
    return this.context as RootStoreInterface;
  }
  get currentTab() {
    return this.store.stateStore.selectedTab;
  }
  get selectedChannelID() {
    return this.store.stateStore.selectedChannelID;
  }
  get showMessageArea() {
    if (!['Servers', 'DMs'].includes(this.currentTab)) {
      return false;
    }
    if (!this.selectedChannelID) {
      return false;
    }
    return true;
  }
  render() {
    return (
      <View style={[style.backgroundColor, styleSheet.container]}>
        <DrawerHeader />
        {this.showMessageArea && <MessageArea key={this.selectedChannelID} />}
      </View>
    );
  }
}
const DrawerHeader = observer(() => {
  const safeTop = StaticSafeAreaInsets.safeAreaInsetsTop;
  let name;
  const selectedTab = store.stateStore.selectedTab;
  if (selectedTab === 'Servers' && store.stateStore.selectedChannelID) {
    name =
      store.channelStore.channels?.[store.stateStore.selectedChannelID]?.name;
  }

  return (
    <View style={[styleSheet.header, {paddingTop: safeTop}]}>
      <Text style={styleSheet.headerName}>
        {name || 'Welcome, ' + store.meStore.user.username}
      </Text>
    </View>
  );
});

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: 60,
    justifyContent: 'center',
  },
  headerName: {alignSelf: 'center', color: 'white'},
});
