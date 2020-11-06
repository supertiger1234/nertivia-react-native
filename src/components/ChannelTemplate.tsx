import React from 'react';
import {observer} from 'mobx-react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Channel from '../interfaces/Channel';
import {storeContext} from '../stores/RootStore';
import style from '../style';
import {Navigation} from 'react-native-navigation';

export default observer(({channel}: {channel: Channel}) => {
  const {stateStore} = React.useContext(storeContext);
  const selected = channel.channelID === stateStore.selectedChannelID;
  return (
    <View style={{overflow: 'hidden', borderRadius: 4, margin: 2}}>
      <Pressable
        style={[styleSheet.button, selected && styleSheet.selected]}
        android_ripple={{color: 'rgba(255, 255, 255, 0.6)'}}
        onPress={() => {
          stateStore.setSelectedChannelID(channel.channelID);
          Navigation.mergeOptions('DRAWERS', {
            sideMenu: {
              left: {
                visible: false,
              },
            },
          });
        }}>
        <View style={styleSheet.dot} />
        <Text style={{color: 'white', padding: 8}}>{channel.name}</Text>
      </Pressable>
    </View>
  );
});

const styleSheet = StyleSheet.create({
  button: {
    flexDirection: 'row',
    opacity: 0.7,
  },
  selected: {
    backgroundColor: style.primaryBoxColor.backgroundColor,
    opacity: 1,
  },
  dot: {
    backgroundColor: 'white',
    alignSelf: 'center',
    marginLeft: 10,
    borderRadius: 5,
    width: 5,
    height: 5,
  },
});
