import { app } from '@main/config/app';
import { logger } from '@main/config/logger';
import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  logger.info(`New socket connected: ${socket.id}`);
});

export { io, server };
