import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import config from '../config';
import Channel from '../interfaces/Channel';
import {store} from '../stores/RootStore';
import ChannelTemplate from './ChannelTemplate';

export default () => {
  const [mounted, setMounted] = useState(false);
  const scaleBannerAnimVal = new Animated.Value(0.8);
  const transChanListVal = new Animated.Value(30);
  const opacityAnim = new Animated.Value(0);
  const safeTop = StaticSafeAreaInsets.safeAreaInsetsTop;
  const server =
    store.serverStore.servers[store.stateStore.selectedServerID || ''];

  if (!mounted) {
    setTimeout(() => {
      setMounted(true);
    }, 0);
    return <View />;
  }
  setTimeout(() => {
    Animated.timing(scaleBannerAnimVal, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(transChanListVal, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, 0);
  return (
    <View style={styleSheet.container}>
      {server.banner && (
        <Animated.View
          style={{
            transform: [{scale: scaleBannerAnimVal}],
            opacity: opacityAnim,
          }}>
          <FastImage
            resizeMode={FastImage.resizeMode.cover}
            style={styleSheet.banner}
            source={{uri: config.nertiviaCDN + server.banner + '?type=webp'}}
          />
        </Animated.View>
      )}
      <Animated.ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        style={{
          transform: [{translateY: transChanListVal}],
          opacity: opacityAnim,
        }}>
        {store.channelStore
          .serverChannels(store.stateStore.selectedServerID || '')
          .map((channel) => (
            <ChannelTemplate channel={channel} key={channel.channelID} />
          ))}
      </Animated.ScrollView>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  container: {flex: 1, overflow: 'hidden'},
  banner: {
    margin: 5,
    height: 130,
    borderRadius: 4,
  },
});
