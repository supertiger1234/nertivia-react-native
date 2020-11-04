import {observer} from 'mobx-react';
import React, {Component, useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import config from '../config';
import Message from '../interfaces/Message';
import {store} from '../stores/RootStore';
import style from '../style';

export default observer(() => {
  const channelID = store.stateStore.selectedChannelID;
  const messages = store.messageStore.messages[channelID || ''];

  const renderRow = ({item}: {item: Message}) => {
    return <MessageTemplate message={item} />;
  };
  const keyExtractor = (item: any) => item.tempID || item.messageID;

  return (
    <View style={{flex: 1}}>
      <FlatList
        inverted
        data={messages}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
      />
    </View>
  );
});

const MessageTemplate = React.memo(({message}: {message: Message}) => {
  return (
    <View style={{flexDirection: 'row', margin: 3}}>
      <AvatarTemplate size={40} imageID={message.creator.avatar} />
      <View style={styleSheet.triangle} />
      <Bubble message={message} />
      <Text>Test</Text>
    </View>
  );
});

const AvatarTemplate = (props: {imageID?: string | null; size: number}) => {
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

const Bubble = ({message}: {message: Message}) => {
  return (
    <View style={styleSheet.bubble}>
      <Text style={styleSheet.username}>{message.creator.username}</Text>
      <Text style={{color: 'white'}}>{message.message}</Text>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    padding: 3,
    paddingTop: 0,
    flexShrink: 1,
    borderTopLeftRadius: 0,
  },
  triangle: {
    alignSelf: 'flex-start',
    width: 0,
    height: 0,
    // border-top: 10px solid transparent;
    // border-bottom: 10px solid transparent;
    // border-right:10px solid blue;

    borderTopColor: 'transparent',
    borderTopWidth: 0,

    borderBottomColor: 'transparent',
    borderBottomWidth: 10,

    borderRightColor: 'rgba(255,255,255,0.2)',
    borderRightWidth: 10,
  },
  username: {fontWeight: 'bold', color: 'white'},
});
