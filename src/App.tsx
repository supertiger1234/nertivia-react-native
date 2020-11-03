import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

import {socketInstance} from './socketio/socketIOInstance';
import {store} from './stores/RootStore';
import style from './style';

export default class App extends Component {
  componentDidMount() {
    // connects
    socketInstance();
  }
  render() {
    return (
      <View style={[style.backgroundColor, styleSheet.container]}>
        <DrawerHeader />
        <Text>hello</Text>
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
