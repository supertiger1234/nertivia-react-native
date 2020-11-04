import {action, makeAutoObservable} from 'mobx';
import {fetchMessages} from '../axiosInstance';
import Message from '../interfaces/Message';

interface MessagesObj {
  [key: string]: Message[];
}

export interface IMessageStore {
  messages: MessagesObj;
  fetchAndSetMessages: (channelID: string) => void;
  addMessage: (payload: Message) => void;
  deleteMessage: (payload: {channelID: string; messageID: string}) => void;
  updateMessage: (payload: {
    channelID: string;
    messageID: string;
    message: Partial<Message>;
  }) => void;
}

export class MessageStore implements IMessageStore {
  messages: MessagesObj = {};
  constructor() {
    makeAutoObservable(this);
  }

  addMessage = (payload: Message) => {
    const messages = this.messages[payload.channelID];
    if (!messages) {
      return;
    }
    this.messages[payload.channelID] = [payload, ...messages];
  };
  updateMessage = (payload: {
    channelID: string;
    messageID: string;
    message: Partial<Message>;
  }) => {
    const messages = this.messages[payload.channelID];
    if (!messages) {
      return;
    }
    const messageIndex = messages.findIndex(
      (m) => m.messageID === payload.messageID,
    );
    if (messageIndex < 0) {
      return;
    }
    messages[messageIndex] = {...messages[messageIndex], ...payload.message};
    this.messages[payload.channelID] = [...messages];
  };

  deleteMessage = (payload: {channelID: string; messageID: string}) => {
    const messages = this.messages[payload.channelID];
    if (!messages) {
      return;
    }
    this.messages[payload.channelID] = messages.filter(
      (m) => m.messageID !== payload.messageID,
    );
  };

  fetchAndSetMessages = (channelID: string) => {
    fetchMessages(channelID).then(
      action('fetchSuccess', (res: any) => {
        const messages = res.data.messages;
        this.messages[channelID] = messages;
      }),
    );
  };
}
