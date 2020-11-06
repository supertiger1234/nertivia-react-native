import {transform} from '@babel/core';
import {autorun} from 'mobx';
import {observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {storeContext} from '../stores/RootStore';

export default observer(() => {
  const {meStore} = React.useContext(storeContext);
  const [moveDown] = useState(new Animated.Value(-40));
  const [opacity] = useState(new Animated.Value(0));

  function show() {
    Animated.timing(moveDown, {
      toValue: 70,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  function hide() {
    Animated.timing(moveDown, {
      toValue: -40,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }

  useEffect(() => {
    show();
    const dispose = autorun(() => {
      if (meStore.connected) {
        setTimeout(() => {
          hide();
          setTimeout(() => {
            Navigation.dismissOverlay('CONNECTION_OVERLAY').catch(() => {});
          }, 200);
        }, 2000);
      }
    });

    return () => {
      dispose();
    };
  });
  let message = meStore?.connectionMessage;
  if (meStore.connected) {
    message = 'Ready!';
  }

  return (
    <Animated.View
      style={[
        styleSheet.container,
        {opacity: opacity, transform: [{translateY: moveDown}]},
      ]}>
      <Text style={styleSheet.text}>{message}</Text>
    </Animated.View>
  );
});

const styleSheet = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 4,
    alignSelf: 'center',
    padding: 5,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
