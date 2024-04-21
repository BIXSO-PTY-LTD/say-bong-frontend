"use client"

import { Box, Stack, Typography } from "@mui/material";
import ChatMessageList from "./chat-message-list";
import ChatMessageInput from "./chat-message-input";
import { useRouter } from '#/routes/hooks';
import { useEffect, useState } from "react";
import { useAuthContext } from "#/auth/hooks";
import { useDialogControls } from "#/hooks/use-dialog-controls";
import LoginDialog from "../auth/login-dialog";
import RegisterDialog from "../auth/register-dialog";
import { ILivestreamItem } from "#/types/livestream";
import { useGetLivestreamComments } from "#/api/chat";
import { IAuthor, ICommentItem } from "#/types/chat";
import io, { Socket } from "socket.io-client";

type Props = {
  currentLivestream?: ILivestreamItem
}

export default function LivestreamChatView({ currentLivestream }: Props) {
  const [socket, setSocket] = useState<Socket | null>(null);

  const router = useRouter();

  const { user } = useAuthContext();

  const { dialogLoginOpen, dialogRegisterOpen } = useDialogControls();


  const { comments, commentsError } = useGetLivestreamComments(currentLivestream?.id);

  const authors: IAuthor[] = comments
    .flatMap(comment => comment.author)
    .filter(author => author.id !== user?.id);


  useEffect(() => {
    const getAccessToken = () => {
      // Function to get access token from localStorage (or sessionStorage)
      const token = localStorage.getItem("accessToken");
      return token ? token : null;
    };

    // Connect to the Socket.IO server
    const socket = io("http://157.119.248.121:8001", {
      // Pass access token in the Authorization header
      extraHeaders: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    });


    // Set the socket connection to state
    setSocket(socket);

    // Clean up function to disconnect the socket when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Listen for the 'connect' event
    socket.on('connect', () => {
      console.log('Connected to the server');

      // Send a test message to the server after connecting
      socket.emit('chat message', 'Hello from the client');
    });

    // Listen for the 'chat message' event from the server
    socket.on('chat message', (message) => {
      console.log('Received message from server:', message);
    });

    // Listen for the 'disconnect' event
    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    // Clean up event listeners when component unmounts
    return () => {
      socket.off('connect');
      socket.off('chat message');
      socket.off('disconnect');
    };
  }, [socket]);


  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 1, py: 1, minHeight: 0 }}
    >
      Chat
    </Stack>
  );
  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList comments={comments} authors={authors} />

      {user ? (
        <ChatMessageInput
          currentLivestreamId={currentLivestream?.id}
          userId={user?.id}
        />
      ) :
        (
          <Box textAlign="center" sx={{ p: 1 }}>
            <Typography component='span' onClick={dialogLoginOpen.onTrue} sx={{ cursor: "pointer" }} color="primary">Đăng nhập</Typography><Typography component='span'> để chat</Typography>
          </Box>
        )}

    </Stack>
  );

  return (
    <>
      <Stack
        sx={{
          width: 1,
          height: "530px",
          overflow: 'hidden',
        }}
      >
        {renderHead}

        <Stack
          direction="row"
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {renderMessages}


        </Stack>
      </Stack>
      {dialogLoginOpen.value && <LoginDialog openRegister={dialogRegisterOpen.onTrue} open={dialogLoginOpen.value} onClose={dialogLoginOpen.onFalse} />}
      {dialogRegisterOpen.value && <RegisterDialog openLogin={dialogLoginOpen.onTrue} open={dialogRegisterOpen.value} onClose={dialogRegisterOpen.onFalse} />}

    </>
  )
}