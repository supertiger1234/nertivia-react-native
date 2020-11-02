import AsyncStorage from '@react-native-async-storage/async-storage';
import {eventEmitter} from '../../FCM';
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
  servers: ReturnedServer[];
  custom_status?: string;
  status: number;
}
interface ReturnedServer {
  avatar: string;
  banner: string;
  channel_position: string[];
  channels: ReturnedChannel[];
  creator: {
    uniqueID: string;
  };
  default_channel_id: string;
  name: string;
  server_id: string;
  verified: boolean;
}
interface ReturnedChannel {
  channelID: string;
  name?: string;
  server_id?: string;
  lastMessaged: number;
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

    // set servers
    const servers: any = {};
    for (let index = 0; index < data.user.servers.length; index++) {
      const server = data.user.servers[index];
      servers[server.server_id] = {
        avatar: server.avatar,
        banner: server.banner,
        creator: server.creator,
        default_channel_id: server.default_channel_id,
        name: server.name,
        server_id: server.server_id,
        verified: server.verified,
        channel_position: server.channel_position,
      };
    }
    store.serverStore.initServer(servers);
  });
}
