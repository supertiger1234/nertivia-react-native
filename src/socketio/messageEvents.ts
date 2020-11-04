import Message from '../interfaces/Message';
import {store} from '../stores/RootStore';

interface DeleteMessageData {
  channelID: string;
  messageID: string;
}

export default function connectionEvents(socket: SocketIOClient.Socket) {
  socket.on('receiveMessage', async (data: {message: Message}) => {
    const channel = store.channelStore.channels[data.message.channelID];
    const isMe = data.message.creator.uniqueID === store.meStore.user.uniqueID;

    store.messageStore.addMessage({
      ...data.message,
      type: data.message.type || 0,
    });
  });

  socket.on('delete_message', (data: DeleteMessageData) => {
    store.messageStore.deleteMessage(data);
  });
  socket.on('update_message', (data: Message) => {
    store.messageStore.updateMessage({
      channelID: data.channelID,
      messageID: data.messageID as any,
      message: data,
    });
  });
}
