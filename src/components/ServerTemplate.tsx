import React from 'react';
import {Image, Pressable, StyleSheet} from 'react-native';
import config from '../config';
import Server from '../interfaces/Server';

export default ({item}: {item: Server}) => {
  let avatar = {uri: config.nertiviaCDN + item.avatar};
  if (!item.avatar) {
    avatar = require('../assets/logo.png');
  }
  return (
    <Pressable android_ripple={styleSheet.container}>
      <Image source={avatar} style={styleSheet.image} />
    </Pressable>
  );
};
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
});
