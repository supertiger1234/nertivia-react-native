import {action, makeAutoObservable} from 'mobx';
import {fetchMessages, postMessage} from '../axiosInstance';
import Message from '../interfaces/Message';
import {socketInstance} from '../socketio/socketIOInstance';
import {RootStoreInterface} from './RootStore';

interface MessagesObj {
  [key: string]: Message[];
}

function generateNum(n: number): string {
  const add = 1;
  let max = 12 - add; // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

  if (n > max) {
    return generateNum(max) + generateNum(n - max);
  }

  max = Math.pow(10, n + add);
  const min = max / 10; // Math.pow(10, n) basically
  const number = Math.floor(Math.random() * (max - min + 1)) + min;

  return ('' + number).substring(add);
}

interface groupedMessage extends Message {
  grouped?: boolean;
}

export interface IMessageStore {
  messages: MessagesObj;
  fetchAndSetMessages: (channelID: string) => void;
  sendMessage: (payload: {message: string; channelID: string}) => void;
  addMessage: (payload: Message) => void;
  deleteMessage: (payload: {channelID: string; messageID: string}) => void;
  updateMessage: (payload: {
    channelID: string;
    messageID?: string;
    tempID?: string;
    message: Partial<Message>;
  }) => void;
  groupedChannelMessages(id: string): groupedMessage[];
}

export class MessageStore implements IMessageStore {
  private rootStore: RootStoreInterface;
  messages: MessagesObj = {};
  constructor(rootStore: RootStoreInterface) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  // Group messages IF:
  // They are sent in the same minute.
  // They are sent by the same creator.
  // The group is less than 4 messages.
  get groupedChannelMessages() {
    return (id: string) => {
      let messages = this.messages[id];
      if (!messages) {
        return [];
      }
      messages = messages.slice().reverse();
      const creatorMatch = (message1: Message, message2: Message) =>
        message1.creator.uniqueID === message2.creator.uniqueID;

      const isMoreThanAMinute = (
        beforeMessage: Message,
        afterMessage: Message,
      ) => {
        const beforeDate = new Date(beforeMessage.created);
        const afterDate = new Date(afterMessage.created);
        const minutesMatch = () =>
          beforeDate.getMinutes() === afterDate.getMinutes();
        const hoursMatch = () => beforeDate.getHours() === afterDate.getHours();
        return !(minutesMatch() && hoursMatch());
      };

      let count = 0;

      const groupedMessages = [];
      for (let index = messages.length - 1; index >= 0; index--) {
        const currentMessage = messages[index];
        const beforeMessage = messages[index - 1];
        if (!beforeMessage || !creatorMatch(beforeMessage, currentMessage)) {
          count = 0;
          groupedMessages.push(currentMessage);
          continue;
        }

        if (count >= 4 || isMoreThanAMinute(beforeMessage, currentMessage)) {
          count = 0;
          groupedMessages.push(currentMessage);
          continue;
        }
        count += 1;
        groupedMessages.push({...currentMessage, grouped: true});
      }
      return groupedMessages;
    };
  }

  sendMessage = (payload: {message: string; channelID: string}) => {
    const trimmedMessage = payload.message.trim();
    const tempID = generateNum(25);
    this.addMessage({
      channelID: payload.channelID,
      message: trimmedMessage,
      tempID,
      type: 0,
      sending: 0,
      created: Date.now(),
      creator: this.rootStore.meStore.user as any,
    });
    postMessage(
      trimmedMessage,
      tempID,
      payload.channelID,
      this.rootStore.meStore.socketID || '',
    )
      .then((res) => {
        const message = res.data.messageCreated;
        this.updateMessage({
          channelID: message.channelID,
          message: {...message, sending: 1},
          tempID,
        });
      })
      .catch((err) => {
        console.log(err);
        this.updateMessage({
          channelID: payload.channelID,
          message: {sending: 2},
          tempID,
        });
        this.addMessage({
          channelID: payload.channelID,
          message: err.response.data.message,
          messageID: Math.random().toString(),
          type: 0,
          created: Date.now(),
          creator: {
            username: 'Beep Boop',
            uniqueID: '0',
            tag: '0000',
          },
        });
      });
  };

  addMessage = (payload: Message) => {
    const messages = this.messages[payload.channelID];
    if (!messages) {
      return;
    }
    this.messages[payload.channelID] = [payload, ...messages];
  };
  updateMessage = (payload: {
    channelID: string;
    tempID?: string;
    messageID?: string;
    message: Partial<Message>;
  }) => {
    const messages = this.messages[payload.channelID];
    if (!messages) {
      return;
    }
    const messageIndex = messages.findIndex((m) =>
      payload.messageID
        ? payload.messageID === m.messageID
        : payload.tempID === m.tempID,
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
