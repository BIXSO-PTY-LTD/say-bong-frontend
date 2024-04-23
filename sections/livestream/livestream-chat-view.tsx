import { Box, Stack, Typography } from "@mui/material";
import ChatMessageList from "./chat-message-list";
import ChatMessageInput from "./chat-message-input";
import { useRouter, useSearchParams } from '#/routes/hooks';
import { useMockedUser } from "#/hooks/use-mocked-user";
import { useCallback, useEffect, useState } from "react";
import { paths } from "#/routes/paths";
import { ITourProps } from "#/types/tour";
import { useAuthContext } from "#/auth/hooks";
import { RouterLink } from "#/routes/components";
import { useDialogControls } from "#/hooks/use-dialog-controls";
import LoginDialog from "../auth/login-dialog";
import RegisterDialog from "../auth/register-dialog";
import ChangePasswordDialog from "../auth/change-password-dialog";
import { ILivestreamItem } from "#/types/livestream";
import { useGetLivestreamComments } from "#/api/chat";
import { IAuthor, ICommentItem, ICommentUser } from "#/types/chat";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { mutate } from "swr";
type Props = {
  currentLivestream?: ILivestreamItem
}

export default function LivestreamChatView({ currentLivestream }: Props) {

  const router = useRouter();

  const { user } = useAuthContext();

  const { dialogLoginOpen, dialogRegisterOpen } = useDialogControls();

  const { comments, commentsError, endpoint } = useGetLivestreamComments(currentLivestream?.id);

  const authors: IAuthor[] = comments
    .flatMap(comment => comment.author)
    .filter(author => author.id !== user?.id);


  useEffect(() => {
    if (commentsError || !currentLivestream) {
      console.log("error");
    }
  }, [commentsError, router, currentLivestream]);

  const [socket, setSocket] = useState<Socket | null>(null);


  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("Access token not found in localStorage");
      return;
    }

    // Establish connection to the Socket.IO server
    const newSocket = io("ws://157.119.248.121:8001", {
      extraHeaders: { Authorization: accessToken }, // Use the stored token
    });

    // Set up event listeners or any other initialization logic for the socket
    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      // You can perform any additional setup here
    });
    newSocket.on("1", (comment: { status: number, message: string, data: ICommentItem }) => {
      console.log(currentLivestream?.id, comment.data.postId);

      // Handle the new comment received from the server
      if (currentLivestream?.id === comment.data.postId) {

        mutate(endpoint);
      }
      // Update the comments state with the new comment
    });

    // Save the socket instance to state
    setSocket(newSocket);

    // Clean up the socket connection when the component unmounts
    return () => {
      if (newSocket.connected) {
        console.log("Disconnecting from Socket.IO server");
        newSocket.disconnect();
      }
    };
  }, [currentLivestream?.id, endpoint]);

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