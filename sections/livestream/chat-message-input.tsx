import { useMemo, useState, useCallback } from 'react';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';




import Iconify from '#/components/iconify';
import { useSendMessage } from '#/api/chat';


// ----------------------------------------------------------------------

type Props = {
  currentLivestreamId: string | undefined;
  userId: string | undefined;
};

export default function ChatMessageInput({
  currentLivestreamId,
  userId
}: Props) {




  const [message, setMessage] = useState('');

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const messageData = useMemo(
    () => ({
      content: message,
      postId: currentLivestreamId,
      userId: userId
    }),
    [currentLivestreamId, message, userId]
  );

  const sendMessage = useSendMessage()
  const handleSendMessage = useCallback(async () => {
    try {
      if (message) {
        await sendMessage(messageData)
        setMessage('');
      }
    } catch (error) {
      console.error(error);
    }
  }, [message, messageData, sendMessage]);

  const handleKeyPress = useCallback(
    async (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        await handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  return (
    <InputBase
      value={message}
      onKeyUp={handleKeyPress}
      onChange={handleChangeMessage}
      placeholder="Chat..."
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

  );
}
