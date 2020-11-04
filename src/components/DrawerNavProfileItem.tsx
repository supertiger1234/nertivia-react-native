import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import config from '../config';

export default (props: {me: any}) => {
  return (
    <View style={styleSheet.container}>
      <Pressable
        android_ripple={{color: 'rgba(255, 255, 255, 0.6)'}}
        onPress={() => {}}
        style={styleSheet.button}>
        <FastImage
          resizeMode={FastImage.resizeMode.cover}
          style={styleSheet.image}
          source={{
            uri: config.nertiviaCDN + props.me?.avatar + '?type=webp',
          }}
        />
        <Text style={styleSheet.text}>{props.me?.username}</Text>
      </Pressable>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  container: {overflow: 'hidden', borderRadius: 4},
  text: {
    color: 'white',
    fontSize: 12,
    opacity: 0.7,
  },
  image: {width: 26, height: 26, borderRadius: 26},
  button: {
    height: 50,
    minWidth: 60,
    maxWidth: 100,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
