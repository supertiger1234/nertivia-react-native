import {observer} from 'mobx-react';
import React, {Component} from 'react';
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import config from '../config';
import {RootStoreInterface, storeContext} from '../stores/RootStore';

const serverTemplate = ({item}) => {
  let avatar = {uri: config.nertiviaCDN + item.avatar};
  if (!item.avatar) {
    avatar = require('../assets/logo.png');
  }
  return (
    <Pressable android_ripple={{color: 'rgba(255, 255, 255, 0.5)'}}>
      <Image
        source={avatar}
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,
          margin: 5,
          justifyContent: 'center',
          alignSelf: 'center',
        }}
      />
    </Pressable>
  );
};

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
