import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import config from '../config';
import {store} from '../stores/RootStore';

export default () => {
  const safeTop = StaticSafeAreaInsets.safeAreaInsetsTop;
  const server =
    store.serverStore.servers[store.stateStore.selectedServerID || ''];
  return (
    <View style={styleSheet.container}>
      <View style={[styleSheet.header, {paddingTop: safeTop}]}>
        <Text style={styleSheet.serverName}>{server.name}</Text>
      </View>
      {server.banner && (
        <Image
          resizeMode="cover"
          style={styleSheet.banner}
          source={{uri: config.nertiviaCDN + server.banner}}
        />
      )}
      <ScrollView />
    </View>
  );
};

const styleSheet = StyleSheet.create({
  container: {flex: 1, overflow: 'hidden'},
  header: {
    backgroundColor: 'rgba(0,0,0,0.3)',

    height: 60,
    justifyContent: 'center',
  },
  serverName: {alignSelf: 'center', color: 'white'},
  banner: {
    margin: 5,
    height: 130,
    borderRadius: 4,
  },
});
