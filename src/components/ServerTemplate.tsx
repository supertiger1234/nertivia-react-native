import {observer} from 'mobx-react';
import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import config from '../config';
import Server from '../interfaces/Server';
import {store} from '../stores/RootStore';
import style from '../style';
export default observer(({item}: {item: Server}) => {
  const selected = store.stateStore.selectedServerID === item.server_id;
  let avatar = {uri: config.nertiviaCDN + item.avatar + '?type=webp'};
  if (!item.avatar) {
    avatar = require('../assets/logo.png');
  }
  return (
    <Pressable
      onPress={() => {
        store.stateStore.setSelectedServerID(item.server_id);
        store.stateStore.setSelectedChannelID(item.default_channel_id);
        store.stateStore.setSelectedTab('Servers');
      }}>
      {selected && (
        <View style={[styleSheet.selected, style.primaryBoxColor]} />
      )}
      <FastImage
        resizeMode={FastImage.resizeMode.cover}
        source={avatar}
        style={styleSheet.image}
      />
    </Pressable>
  );
});
const styleSheet = StyleSheet.create({
  container: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 50,
    margin: 5,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  selected: {
    position: 'absolute',
    top: 5,
    bottom: 5,
    width: 2,
  },
});
