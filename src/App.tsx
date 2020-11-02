import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {socketInstance} from './socketio/socketIOInstance';
import style from './style';

export default class App extends Component {
  componentDidMount() {
    // connects
    socketInstance();
  }
  render() {
    return (
      <View style={[style.backgroundColor, styleSheet.container]}>
        <Text>hello</Text>
      </View>
    );
  }
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
  },
});
