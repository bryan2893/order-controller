import io from 'socket.io-client';

const socketOptions = {reconnect: true,autoConnect: false};

var socket = io('/soda', socketOptions);

export default socket;