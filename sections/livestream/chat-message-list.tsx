import Box from '@mui/material/Box';

import Scrollbar from '#/components/scrollbar';

import { IAuthor, ICommentItem } from '#/types/chat';
import useMessagesScroll from '#/hooks/use-messages-scroll';
import { Lightbox, useLightBox } from '#/components/lightbox';
import ChatMessageItem from './chat-message-item';
import { fDate } from '#/utils/format-time';


// ----------------------------------------------------------------------

type Props = {
  comments: ICommentItem[];
  authors: IAuthor[];
};

export default function ChatMessageList({ comments, authors }: Props) {
  const { messagesEndRef } = useMessagesScroll(comments);

  // Sort comments by createdAt field in descending order
  const sortedComments = [...comments].sort((a, b) => {
    // Convert createdAt fields to timestamps for comparison
    const createdAtA = new Date(a.createdAt).getTime();
    const createdAtB = new Date(b.createdAt).getTime();

    return createdAtA - createdAtB;
  });
  return (
    <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1, overflow: "auto" }}>
      {sortedComments.map((comment) => (
        <ChatMessageItem
          key={comment.id}
          comment={comment}
          authors={authors}
        />
      ))}
    </Scrollbar>
  );
}
