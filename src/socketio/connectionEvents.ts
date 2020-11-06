import AsyncStorage from '@react-native-async-storage/async-storage';
import {store} from '../stores/RootStore';
import {socketInstance} from './socketIOInstance';

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
  channels: ReturnedServerChannel[];
  creator: {
    uniqueID: string;
  };
  default_channel_id: string;
  name: string;
  server_id: string;
  verified: boolean;
}
interface ReturnedServerChannel {
  channelID: string;
  name?: string;
  server_id?: string;
  lastMessaged: number;
}

export default function connectionEvents(socket: SocketIOClient.Socket) {
  socket.on('connect', async () => {
    // set heartbeat to 5000ms
    clearInterval(socket.io.engine.pingTimeoutTimer);
    socket.io.engine.pingTimeout = 5000;
    socket.io.engine.onHeartbeat();

    store.meStore.setConnectionDetails({
      connected: false,
      message: 'Authenticating...',
      socketID: socket.id,
    });

    const token = await AsyncStorage.getItem('token');
    socket.emit('authentication', {token: token});
  });
  socket.on('auth_err', (data: string) => {
    store.meStore.setConnectionDetails({connected: false, message: data});
  });
  socket.on('reconnecting', () => {
    store.meStore.setConnectionDetails({
      connected: false,
      message: 'Reconnecting...',
    });
  });
  socket.on('success', (data: SuccessEvent) => {
    store.meStore.setConnectionDetails({
      connected: true,
      message: null,
      socketID: socket.id,
    });
    store.meStore.initUser({
      avatar: data.user.avatar,
      email: data.user.email,
      tag: data.user.tag,
      uniqueID: data.user.uniqueID,
      username: data.user.username,
    });

    // set servers
    const servers: any = {};
    const channels: any = {};
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
      for (let x = 0; x < server.channels.length; x++) {
        const channel = server.channels[x];
        channels[channel.channelID] = {
          channelID: channel.channelID,
          name: channel.name,
          server_id: channel.server_id,
          lastMessaged: channel.lastMessaged,
        };
      }
    }
    store.serverStore.initServer(servers);
    store.channelStore.initChannels(channels);
  });
}
