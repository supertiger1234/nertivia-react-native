/* eslint-disable curly */
import {autorun, reaction} from 'mobx';
import {observer} from 'mobx-react';
import React, {Component, useEffect} from 'react';
import {FlatList, Image, Pressable, Text, TextInput, View} from 'react-native';
import config from '../config';
import {RootStoreInterface, store, storeContext} from '../stores/RootStore';
import MessageLogs from './MessageLogs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '../style';
import InputArea from './InputArea';

interface State {
  mount: boolean;
}

@observer
export default class App extends Component<any, State> {
  public state: State = {mount: false};
  static contextType = storeContext;
  timeout: NodeJS.Timeout | undefined;

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({mount: true});
      this.loadMessages();
    }, 0);
  }
  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout);
  }
  loadMessages() {
    if (!this.channelID) return;
    if (!this.channel) return;
    if (this.messages) return;
    this.store.messageStore.fetchAndSetMessages(this.channelID);
  }
  get store() {
    return this.context as RootStoreInterface;
  }
  get channelID() {
    return this.store.stateStore.selectedChannelID;
  }
  get channel() {
    return this.store.channelStore.channels[this.channelID || ''];
  }
  get messages() {
    return this.store.messageStore.messages[this.channelID || ''];
  }
  render() {
    if (!this.state.mount) return <View />;
    return (
      <View style={{flex: 1}}>
        <MessageLogs />
        <InputArea />
      </View>
    );
  }
}
