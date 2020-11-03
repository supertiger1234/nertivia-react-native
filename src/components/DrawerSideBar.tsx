import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import {RootStoreInterface, storeContext} from '../stores/RootStore';
import serverTemplate from './ServerTemplate';

@observer
export default class DrawerSideBar extends Component {
  static contextType = storeContext;
  get store() {
    return this.context as RootStoreInterface;
  }
  render() {
    const serverArr = Object.values(this.store.serverStore?.servers);
    const safeTop = StaticSafeAreaInsets.safeAreaInsetsTop;
    return (
      <View style={styleSheet.container}>
        {serverArr && (
          <FlatList
            contentContainerStyle={{paddingBottom: 50, paddingTop: safeTop}}
            data={serverArr}
            renderItem={serverTemplate}
            keyExtractor={(item) => item.server_id}
          />
        )}
      </View>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 60,
    height: '100%',
  },
});
