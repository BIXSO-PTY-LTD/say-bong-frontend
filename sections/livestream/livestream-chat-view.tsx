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
import io from "socket.io-client";
import { mutate } from "swr";
import Image from "#/components/image";
import useSocket from "#/websocket/useSocket";

type Props = {
  currentLivestream?: ILivestreamItem;
};



export default function LivestreamChatView({ currentLivestream }: Props) {
  const { user } = useAuthContext();


  const { dialogLoginOpen, dialogRegisterOpen } = useDialogControls();
  const { comments, endpoint } = useGetLivestreamComments(currentLivestream?.id);
  const authors: IAuthor[] = comments.flatMap((comment) => comment.author).filter((author) => author.id !== user?.id);

   useSocket(user, currentLivestream, endpoint);


  const renderHead = (
    <Stack direction="row" alignItems="center" flexShrink={0} sx={{ px: 2, py: 2, background: "#141622", border: "1px solid #1B1D29" }}>
      <Image alt="chat-elipse" src="/assets/icons/chat/chat-elipse.svg" sx={{ mr: "13px", pb: 0.5 }} />
      Chat
    </Stack >
  );

  const renderMessages = (
    <Stack sx={{ width: 1, height: 1, overflow: "hidden", background: "rgba(145, 158, 171, 0.08)" }}>
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
      <Stack sx={{ maxWidth: { lg: "343px" }, height: "524px", overflow: "hidden", position: "relative" }}>
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
