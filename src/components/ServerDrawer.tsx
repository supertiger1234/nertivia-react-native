import React from 'react';
import {Animated, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';
import config from '../config';
import {store} from '../stores/RootStore';

export default () => {
  const scaleBannerAnimVal = new Animated.Value(0.8);
  const transChanListVal = new Animated.Value(30);
  const safeTop = StaticSafeAreaInsets.safeAreaInsetsTop;
  const server =
    store.serverStore.servers[store.stateStore.selectedServerID || ''];

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

  return (
    <View style={styleSheet.container}>
      <View style={[styleSheet.header, {paddingTop: safeTop}]}>
        <Text style={styleSheet.serverName}>{server.name}</Text>
      </View>
      {server.banner && (
        <Animated.View
          style={{
            transform: [{scale: scaleBannerAnimVal}],
            opacity: scaleBannerAnimVal,
          }}>
          <Image
            resizeMode="cover"
            style={styleSheet.banner}
            source={{uri: config.nertiviaCDN + server.banner}}
          />
        </Animated.View>
      )}
      <Animated.ScrollView
        contentContainerStyle={{paddingBottom: 50}}
        style={{
          transform: [{translateY: transChanListVal}],
          opacity: scaleBannerAnimVal,
        }}>
        {store.channelStore
          .serverChannels(store.stateStore.selectedServerID || '')
          .map((channel) => (
            <Pressable
              android_ripple={{color: 'rgba(255, 255, 255, 0.6)'}}
              key={channel.channelID}>
              <Text style={{color: 'white', padding: 10}}>{channel.name}</Text>
            </Pressable>
          ))}
      </Animated.ScrollView>
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
