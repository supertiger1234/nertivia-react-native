import AsyncStorage from '@react-native-async-storage/async-storage';
import User from '../interfaces/User';
import {store} from '../stores/RootStore';

interface SuccessEvent {
  user: MeUser;
}

interface MeUser {
  username: string;
  uniqueID: string;
  email: string;
  tag: string;
  admin: number;
  avatar?: string | null;
  friends: Friend[];
  custom_status?: string;
  status: number;
}
interface Friend {
  status: number;
  recipient: User;
}

export default function connectionEvents(socket: SocketIOClient.Socket) {
  socket.on('connect', async () => {
    const token = await AsyncStorage.getItem('token');
    socket.emit('authentication', {token: token});
  });
  socket.on('success', (data: SuccessEvent) => {
    store.meStore.initUser({
      avatar: data.user.avatar,
      email: data.user.email,
      tag: data.user.tag,
      uniqueID: data.user.uniqueID,
      username: data.user.username,
    });
  });
}
