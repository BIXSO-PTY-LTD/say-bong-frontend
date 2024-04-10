import { Box, Stack, Typography } from "@mui/material";
import ChatMessageList from "./chat-message-list";
import ChatMessageInput from "./chat-message-input";
import { useGetConversation, useGetConversations } from "#/api/chat";
import { useRouter } from '#/routes/hooks';
import { useMockedUser } from "#/hooks/use-mocked-user";
import { useCallback, useEffect, useState } from "react";
import { IChatParticipant } from "#/types/chat";
import { paths } from "#/routes/paths";
import { ITourProps } from "#/types/tour";
import { useAuthContext } from "#/auth/hooks";
import { RouterLink } from "#/routes/components";
import { useDialogControls } from "#/hooks/use-dialog-controls";
import LoginDialog from "../auth/login-dialog";
import RegisterDialog from "../auth/register-dialog";
import ChangePasswordDialog from "../auth/change-password-dialog";

type Props = {
  currentTour?: ITourProps
}

export default function LivestreamChatView({ currentTour }: Props) {
  const router = useRouter();
  const { user } = useAuthContext();

  const { dialogLoginOpen, dialogRegisterOpen } = useDialogControls();

  const [recipients, setRecipients] = useState<IChatParticipant[]>([]);


  const { conversation, conversationError } = useGetConversation(currentTour?.id);

  const participants: IChatParticipant[] = conversation
    ? conversation.participants.filter(
      (participant: IChatParticipant) => participant.id !== `${user?.id}`
    )
    : [];

  useEffect(() => {
    if (conversationError || !currentTour) {
      router.push(paths.livestream.root);

    }
  }, [conversationError, router, currentTour]);

  const handleAddRecipients = useCallback((selected: IChatParticipant[]) => {
    setRecipients(selected);
  }, []);

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
      <ChatMessageList messages={conversation?.messages} participants={participants} />

      {user ? (
        <ChatMessageInput
          recipients={recipients}
          onAddRecipients={handleAddRecipients}
          //
          selectedConversationId={currentTour?.id}
          disabled={!recipients.length && !currentTour}
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