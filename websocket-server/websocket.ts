import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 8001;

app.get('/', (req: Request, res: Response) => {
  res.send('Socket.IO server is running');
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Handle events from connected clients
  socket.on('chat message', (message: string) => {
    console.log('Message received:', message);
    // Broadcast the message to all connected clients
    io.emit('chat message', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Error handling for Socket.IO server
io.on('error', (error: Error) => {
  console.error('Socket.IO server error:', error.message);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
