import React from 'react';
import FastImage from 'react-native-fast-image';
import config from '../config';
export default (props: {imageID?: string | null; size: number}) => {
  let source = {uri: config.nertiviaCDN + props.imageID + '?type=webp'};
  if (!props.imageID) {
    source = require('../assets/logo.png');
  }
  return (
    <FastImage
      resizeMode={FastImage.resizeMode.cover}
      source={source}
      style={{width: props.size, height: props.size, borderRadius: props.size}}
    />
  );
};
