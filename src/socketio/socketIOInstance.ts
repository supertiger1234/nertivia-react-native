import IO from 'socket.io-client';
import config from '../config';
import connectionEvents from './connectionEvents';
import messageEvents from './messageEvents';

let socketIO: SocketIOClient.Socket | null = null;

export function socketInstance() {
  if (socketIO) {
    return socketIO;
  }
  socketIO = IO(config.socketIP);
  setupEvents();
  return socketIO;
}

function setupEvents() {
  if (!socketIO) {
    return;
  }
  connectionEvents(socketIO);
  messageEvents(socketIO);
}
