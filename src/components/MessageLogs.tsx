/* eslint-disable curly */
import {observer} from 'mobx-react';
import React, {useRef} from 'react';
import {FlatList, View} from 'react-native';

import {storeContext} from '../stores/RootStore';
import MessageTemplate from './MessageTemplate';

export default observer(() => {
  const flatList = useRef<FlatList>(null);
  const {stateStore, messageStore} = React.useContext(storeContext);

  const channelID = stateStore.selectedChannelID;
  const messages = messageStore.groupedChannelMessages(channelID || '');
  // const messages = messageStore.messages[channelID || ''];

  const renderRow = ({item}: {item: any}) => {
    return <MessageTemplate message={item[0]} grouped={item[1]} />;
  };
  const keyExtractor = (item: any) => item[0].tempID || item[0].messageID;

  return (
    <View style={{flex: 1}}>
      <FlatList
        ref={flatList}
        data={messages}
        onContentSizeChange={() =>
          flatList.current?.scrollToEnd({animated: true})
        }
        onLayout={() => flatList.current?.scrollToEnd({animated: true})}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
      />
    </View>
  );
});
