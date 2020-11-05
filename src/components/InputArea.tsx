import React, {useRef, useState} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {store} from '../stores/RootStore';

import style from '../style';

export default () => {
  const [message, setMessage] = useState('');
  const textInput = useRef<TextInput>(null);

  const channelID = store.stateStore.selectedChannelID;

  const sendPressed = () => {
    if (!message.trim() || !channelID) {
      return;
    }
    const msg = message;
    textInput.current?.clear();
    setMessage('');
    setTimeout(() => {
      store.messageStore.sendMessage({
        message: msg,
        channelID: channelID,
      });
    }, 10);
  };
  return (
    <View style={styleSheet.container}>
      <TextInput
        ref={textInput}
        onChangeText={(text) => setMessage(text)}
        value={message}
        style={styleSheet.input}
        multiline={true}
        placeholder="Send a message"
        placeholderTextColor="gray"
      />
      <View style={styleSheet.buttonContainer}>
        <Pressable
          android_ripple={{color: 'white'}}
          onPress={sendPressed}
          style={[
            !!message.trim() && style.primaryBoxColor,
            styleSheet.button,
          ]}>
          <Icon name="send" color="white" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

const styleSheet = StyleSheet.create({
  container: {backgroundColor: 'rgba(0,0,0,0.3)', flexDirection: 'row'},
  input: {color: 'white', flex: 1, maxHeight: 150},
  buttonContainer: {
    alignSelf: 'flex-end',
    marginRight: 5,
    marginBottom: 4,
    overflow: 'hidden',
    borderRadius: 4,
  },
  button: {
    padding: 10,
  },
});
