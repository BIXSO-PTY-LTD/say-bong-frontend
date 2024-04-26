import { Box, Stack, Typography } from "@mui/material";
import ChatMessageList from "./chat-message-list";
import ChatMessageInput from "./chat-message-input";
import { useEffect } from "react";
import { useAuthContext } from "#/auth/hooks";
import { useDialogControls } from "#/hooks/use-dialog-controls";
import LoginDialog from "../auth/login-dialog";
import RegisterDialog from "../auth/register-dialog";
import { ILivestreamItem } from "#/types/livestream";
import { useGetLivestreamComments } from "#/api/chat";
import { IAuthor, ICommentItem } from "#/types/chat";
import { Socket } from "socket.io-client";
import io from "socket.io-client";
import { mutate } from "swr";

type Props = {
  currentLivestream?: ILivestreamItem;
};

const EVENTS = {
  CLIENT: {
    NEW_USER_JOIN_ROOM: "1",
  },
  SERVER: {
    RECEIVE_NEW_LIVE_STREAM_COMMENT: "2",
  },
};

export default function LivestreamChatView({ currentLivestream }: Props) {
  const { user } = useAuthContext();
  const { dialogLoginOpen, dialogRegisterOpen } = useDialogControls();
  const { comments, endpoint } = useGetLivestreamComments(currentLivestream?.id);
  const authors: IAuthor[] = comments.flatMap((comment) => comment.author).filter((author) => author.id !== user?.id);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.log("Access token not found in localStorage");
      return;
    }

    const newSocket = io("ws://157.119.248.121:8001", {
      extraHeaders: { Authorization: accessToken },
    });

    newSocket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      newSocket.emit(EVENTS.CLIENT.NEW_USER_JOIN_ROOM, {
        userId: user?.id,
        postId: currentLivestream?.id,
      });
    });

    newSocket.on(EVENTS.SERVER.RECEIVE_NEW_LIVE_STREAM_COMMENT, (comment: { data: ICommentItem }) => {
      if (comment && comment.data && currentLivestream?.id === comment.data.postId) {
        mutate(endpoint);
      }
    });

    return () => {
      if (newSocket.connected) {
        console.log("Disconnecting from Socket.IO server");
        newSocket.disconnect();
      }
    };
  }, [currentLivestream?.id, endpoint, user?.id]);

  const renderHead = (
    <Stack direction="row" alignItems="center" flexShrink={0} sx={{ pr: 1, pl: 1, py: 1, minHeight: 0 }}>
      Chat
    </Stack>
  );

  const renderMessages = (
    <Stack sx={{ width: 1, height: 1, overflow: "hidden" }}>
      <ChatMessageList comments={comments} authors={authors} />
      {user ? (
        <ChatMessageInput currentLivestreamId={currentLivestream?.id} userId={user?.id} />
      ) : (
        <Box textAlign="center" sx={{ p: 1 }}>
          <Typography component="span" onClick={dialogLoginOpen.onTrue} sx={{ cursor: "pointer" }} color="primary">
            Đăng nhập
          </Typography>
          <Typography component="span"> để chat</Typography>
        </Box>
      )}
    </Stack>
  );

  return (
    <>
      <Stack sx={{ width: 1, height: "530px", overflow: "hidden" }}>
        {renderHead}
        <Stack direction="row" sx={{ width: 1, height: 1, overflow: "hidden", borderTop: (theme) => `solid 1px ${theme.palette.divider}` }}>
          {renderMessages}
        </Stack>
      </Stack>
      {dialogLoginOpen.value && <LoginDialog openRegister={dialogRegisterOpen.onTrue} open={dialogLoginOpen.value} onClose={dialogLoginOpen.onFalse} />}
      {dialogRegisterOpen.value && <RegisterDialog openLogin={dialogLoginOpen.onTrue} open={dialogRegisterOpen.value} onClose={dialogRegisterOpen.onFalse} />}
    </>
  );
}
