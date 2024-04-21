import Box from '@mui/material/Box';

import Scrollbar from '#/components/scrollbar';

import { IAuthor, ICommentItem } from '#/types/chat';
import useMessagesScroll from '#/hooks/use-messages-scroll';
import { Lightbox, useLightBox } from '#/components/lightbox';
import ChatMessageItem from './chat-message-item';


// ----------------------------------------------------------------------

type Props = {
  comments: ICommentItem[];
  authors: IAuthor[];
};

export default function ChatMessageList({ comments, authors }: Props) {
  const { messagesEndRef } = useMessagesScroll(comments);



  return (
    <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1, overflow: "auto" }}>
      {comments.map((comment) => (
        <ChatMessageItem
          key={comment.id}
          comment={comment}
          authors={authors}
        />
      ))}
    </Scrollbar>
  );
}
