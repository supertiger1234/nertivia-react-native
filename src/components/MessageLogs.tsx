/* eslint-disable curly */
import {observer} from 'mobx-react';
import React from 'react';
import {FlatList, View} from 'react-native';

import Message from '../interfaces/Message';
import {storeContext} from '../stores/RootStore';
import MessageTemplate from './MessageTemplate';

export default observer(() => {
  const {stateStore, messageStore} = React.useContext(storeContext);

  const channelID = stateStore.selectedChannelID;
  const messages = messageStore.groupedChannelMessages(channelID || '');

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
