import { sub } from 'date-fns';
import { useRef, useMemo, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { paths } from '#/routes/paths';
import { useRouter } from '#/routes/hooks';

import { useMockedUser } from '#/hooks/use-mocked-user';

import uuidv4 from '#/utils/uuidv4';

import { sendMessage, createConversation } from '#/api/chat';

import Iconify from '#/components/iconify';

import { IChatParticipant } from '#/types/chat';

// ----------------------------------------------------------------------

type Props = {
  recipients: IChatParticipant[];
  onAddRecipients: (recipients: IChatParticipant[]) => void;
  //
  disabled: boolean;
  selectedConversationId: string;
};

export default function ChatMessageInput({
  recipients,
  onAddRecipients,
  //
  disabled,
  selectedConversationId,
}: Props) {


  const router = useRouter();

  const { user } = useMockedUser();

  const fileRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');

  const myContact = useMemo(
    () => ({
      id: `${user?.id}`,
      role: `${user?.role}`,
      email: `${user?.email}`,
      address: `${user?.address}`,
      name: `${user?.displayName}`,
      lastActivity: new Date(),
      avatarUrl: `${user?.photoURL}`,
      phoneNumber: `${user?.phoneNumber}`,
      status: 'online' as 'online' | 'offline' | 'alway' | 'busy',
    }),
    [user]
  );

  const messageData = useMemo(
    () => ({
      id: uuidv4(),
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: sub(new Date(), { minutes: 1 }),
      senderId: myContact.id,
    }),
    [message, myContact.id]
  );

  const conversationData = useMemo(
    () => ({
      id: uuidv4(),
      messages: [messageData],
      participants: [...recipients, myContact],
      type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0,
    }),
    [messageData, myContact, recipients]
  );


  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = useCallback(async () => {
    try {
      if (message) {
        if (selectedConversationId) {
          await sendMessage(selectedConversationId, messageData);
        } else {
          const res = await createConversation(conversationData);
          router.push(`${paths.livestream.root}?id=${res.conversation.id}`);
          onAddRecipients([]);
        }
        setMessage('');
      }
    } catch (error) {
      console.error(error);
    }
  }, [conversationData, message, messageData, onAddRecipients, router, selectedConversationId]);

  const handleKeyPress = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        await handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleKeyPress}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        disabled={disabled}
        startAdornment={
          <IconButton>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
        }
        endAdornment={
          <IconButton onClick={handleSendMessage}>
            <Iconify icon="solar:map-arrow-right-bold-duotone" />
          </IconButton>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}
