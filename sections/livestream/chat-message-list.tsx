import Box from '@mui/material/Box';

import Scrollbar from '#/components/scrollbar';

import { IChatMessage, IChatParticipant } from '#/types/chat';
import useMessagesScroll from '#/hooks/use-messages-scroll';
import { Lightbox, useLightBox } from '#/components/lightbox';
import ChatMessageItem from './chat-message-item';


// ----------------------------------------------------------------------

type Props = {
  messages: IChatMessage[];
  participants: IChatParticipant[];
};

export default function ChatMessageList({ messages = [], participants }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);

  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  const lightbox = useLightBox(slides);

  return (
    <>
      <Box ref={messagesEndRef} sx={{ overflow: "auto", px: 3, py: 5, height: 1 }}>
        <Box>
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              participants={participants}
              onOpenLightbox={() => lightbox.onOpen(message.body)}
            />
          ))}
        </Box>
      </Box>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}