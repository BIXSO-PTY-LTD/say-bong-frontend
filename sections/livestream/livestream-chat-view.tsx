import { Stack } from "@mui/material";
import ChatMessageList from "./chat-message-list";
import ChatMessageInput from "./chat-message-input";
import { useGetConversation, useGetConversations } from "#/api/chat";
import { useRouter } from '#/routes/hooks';
import { useMockedUser } from "#/hooks/use-mocked-user";
import { useCallback, useEffect, useState } from "react";
import { IChatParticipant } from "#/types/chat";
import { paths } from "#/routes/paths";

export default function LivestreamChatView() {
  const router = useRouter();
  const { user } = useMockedUser();

  const [recipients, setRecipients] = useState<IChatParticipant[]>([]);


  const selectedConversationId = 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2' || '';

  const { conversations, conversationsLoading } = useGetConversations();

  const { conversation, conversationError } = useGetConversation(`${selectedConversationId}`);

  const participants: IChatParticipant[] = conversation
    ? conversation.participants.filter(
      (participant: IChatParticipant) => participant.id !== `${user?.id}`
    )
    : [];

  useEffect(() => {
    if (conversationError || !selectedConversationId) {
      router.push(paths.livestream.root);
    }
  }, [conversationError, router, selectedConversationId]);

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

      <ChatMessageInput
        recipients={recipients}
        onAddRecipients={handleAddRecipients}
        //
        selectedConversationId={selectedConversationId}
        disabled={!recipients.length && !selectedConversationId}
      />
    </Stack>
  );

  return (
    <Stack
      sx={{
        width: 1,
        height: "425px",
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
  )
}