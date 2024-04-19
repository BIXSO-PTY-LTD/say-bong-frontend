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

type Props = {
  currentLivestream?: ILivestreamItem
}

export default function LivestreamChatView({ currentLivestream }: Props) {

  const router = useRouter();

  const { user } = useAuthContext();

  const { dialogLoginOpen, dialogRegisterOpen } = useDialogControls();


  const { comments, commentsError } = useGetLivestreamComments(currentLivestream?.id);

  const authors: IAuthor[] = comments
    .flatMap(comment => comment.author)
    .filter(author => author.id !== user?.id);


  const [socketComments, setComments] = useState<ICommentItem[]>([]);

  const [socketAuthors, setAuthors] = useState<IAuthor[]>([]);

  const handleWebSocketMessage = (event: MessageEvent) => {
    const newMessage = JSON.parse(event.data);
    setComments(prevComments => [...prevComments, newMessage.comment]);
    setAuthors(prevAuthors => [...prevAuthors, newMessage.author]);
  };

  // WebSocket setup
  useEffect(() => {
    const socket = new WebSocket('ws://157.119.248.121:8001/');

    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = handleWebSocketMessage;

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };


    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (commentsError || !currentLivestream) {
      console.log("error");

    }
  }, [commentsError, router, currentLivestream]);



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
      <ChatMessageList comments={socketComments} authors={socketAuthors} />

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