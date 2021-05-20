import io from 'socket.io-client';

const clientSocket = () => {
  const socket = io({
    reconnectionAttempts: 4,
    reconnectionDelay: 3000,
    reconnectionDelayMax: 10000,
    transports: [ 'websocket' ]
  });

  socket.on('connect', () => {});
  socket.on('connect_error', err => console.log(err));
  socket.on('connect_timeout', err => console.log(err));
  socket.on('error', err => console.log(err));
  socket.on('reconnect_failed', () => {});

  return socket;
};

export { clientSocket };