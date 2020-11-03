import {observer} from 'mobx-react';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../stores/RootStore';
import style from '../style';

export default (props: {icon: string; name: string; selected?: string}) => {
  const selected = props.selected === props.name;
  return (
    <View style={{overflow: 'hidden', borderRadius: 4}}>
      <Pressable
        android_ripple={{color: 'rgba(255, 255, 255, 0.6)'}}
        onPress={() => {
          store.stateStore.setSelectedTab(props.name);
        }}
        style={[styleSheet.button, selected && styleSheet.selectedButton]}>
        <Icon name={props.icon} size={25} color="white" />
        <Text style={{color: 'white', fontSize: 12}}>{props.name}</Text>
      </Pressable>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  button: {
    height: 50,
    minWidth: 60,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
    backgroundColor: 'transparent',
  },
  selectedButton: {
    opacity: 1,
    backgroundColor: style.primaryBoxColor.backgroundColor,
  },
});
