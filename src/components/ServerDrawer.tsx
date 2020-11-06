import React, {useState} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import config from '../config';
import {storeContext} from '../stores/RootStore';
import ChannelTemplate from './ChannelTemplate';

export default () => {
  const {stateStore, serverStore, channelStore} = React.useContext(
    storeContext,
  );

  const [mounted, setMounted] = useState(false);
  const scaleBannerAnimVal = new Animated.Value(0.8);
  const transChanListVal = new Animated.Value(30);
  const opacityAnim = new Animated.Value(0);
  const server = serverStore.servers[stateStore.selectedServerID || ''];

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
        {channelStore
          .serverChannels(stateStore.selectedServerID || '')
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
