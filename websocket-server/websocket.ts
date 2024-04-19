import { ICommentItem } from '#/types/chat';
import WebSocket from 'ws';

type Data = {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string | null;
  content: string;
  postId: string;
  author: {
    id: string;
    userName: string;
    fullName: string;
    profileImage: string;
  };
}

const wss = new WebSocket.Server({
  port: 8001
});

wss.on('connection', (ws: WebSocket, req: any) => {
  // Extract authorization token from headers
  const token = req.headers['accessToken'];

  // Check if token is valid, you should implement your own validation logic here

  // If token is not valid, you can close the connection
  if (!isValidToken(token)) {
    ws.close();
    return;
  }

  console.log('Client connected with token:', token);

  ws.on('message', (message) => {
    console.log('received: %s', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Example function to validate token (replace with your own logic)
function isValidToken(token: string) {
  // Implement your token validation logic here
  // For example, check if the token is present and not expired
  return !!token;
}
