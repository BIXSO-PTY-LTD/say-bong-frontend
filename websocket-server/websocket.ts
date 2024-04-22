import { ICommentItem } from '#/types/chat';
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer);

io.on('connection', (socket: Socket) => {
  console.log('A client connected');

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Assume 'comment' event is emitted from the client
  socket.on('1', (comment: ICommentItem) => {
    console.log('New comment received:', comment);
    // Broadcast the comment to all clients except the sender
    io.emit('1', comment);
  });
});
const PORT = process.env.PORT || 8001;
httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});