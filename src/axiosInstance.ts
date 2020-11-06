import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios, {AxiosResponse} from 'axios';
import Message from './interfaces/Message';

const instance = Axios.create({
  baseURL: 'https://supertiger.tk/api/',
});

putAuthHeader();

export function putAuthHeader() {
  AsyncStorage.getItem('token').then((token) => {
    instance.defaults.headers.common.authorization = token;
  });
}

export default instance;

interface LoginResponse {
  token: string;
}

export function postLogin(
  email: string,
  password: string,
  token: string,
): Promise<AxiosResponse<LoginResponse>> {
  return instance.post('user/login', {email, password, token});
}

interface MessageFetchResponse {
  channelID: string;
  messages: Message[];
}

export function fetchMessages(
  channelID: string,
): Promise<AxiosResponse<MessageFetchResponse>> {
  return instance.get(`messages/channels/${channelID}`);
}

interface PostMessageResponse {
  tempID: string;
  messageCreated: Message;
}

export function postMessage(
  message: string,
  tempID: string,
  channelID: string,
  socketID: string,
): Promise<AxiosResponse<PostMessageResponse>> {
  return instance.post(`messages/channels/${channelID}`, {
    message,
    tempID,
    socketID,
  });
}
