import { useMemo, useState, useCallback } from 'react';

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import EmojiPicker from 'emoji-picker-react';
import Iconify from '#/components/iconify';
import { useSendMessage } from '#/api/chat';
import Image from '#/components/image';


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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleChangeMessage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  }, []);

  const handleEmojiClick = (emojiData: any, event: any) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji)

  }

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
    <>
      <InputBase
        value={message}
        onKeyUp={handleKeyPress}
        onChange={handleChangeMessage}
        placeholder="Chat..."
        startAdornment={
          <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
            <Image alt="smile-face" src='/assets/icons/chat/smile-face.svg' sx={{ pb: 0.5 }} />
          </IconButton>
        }
        endAdornment={
          <IconButton onClick={handleSendMessage}>
            <Image alt="smile-face" src='/assets/icons/chat/arrow.svg' sx={{ pb: 0.5 }} />
          </IconButton>
        }
        sx={{
          px: 1,
          height: "80px",
          flexShrink: 0,
          background: "#141622",
        }}
      />
      {showEmojiPicker &&
        (
          <EmojiPicker onEmojiClick={handleEmojiClick} width="300px" height="400px" style={{ position: "absolute", bottom: 60 }}/>
        )}
    </>
  );
}
