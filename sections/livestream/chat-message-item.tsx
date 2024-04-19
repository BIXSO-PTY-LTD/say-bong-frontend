import { formatDistanceToNowStrict } from 'date-fns';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useMockedUser } from '#/hooks/use-mocked-user';

import Iconify from '#/components/iconify';

import { IAuthor, ICommentItem } from '#/types/chat';
import useGetMessage from '#/hooks/use-get-message';
import { useAuthContext } from '#/auth/hooks';


// ----------------------------------------------------------------------

type Props = {
  comment: ICommentItem;
  authors: IAuthor[];
};

export default function ChatMessageItem({ comment, authors }: Props) {
  const { user } = useAuthContext();

  const isMe: boolean = user?.id === comment.author.id;


  // const { firstName } = senderDetails;

  // const { body, createdAt } = message;

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...(!isMe && {
          mr: 'auto',
        }),
      }}
    >
      {!isMe && `${comment.author.userName},`} &nbsp;
      {formatDistanceToNowStrict(new Date(comment.createdAt), {
        addSuffix: true,
      })}
    </Typography>
  );

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        bgcolor: 'background.neutral',
        ...(user && {
          color: 'grey.800',
          bgcolor: 'primary.lighter',
        })
      }}
    >

      {comment.content}

    </Stack>
  );


  return (
    <Stack direction="row" justifyContent={isMe ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
      <Stack alignItems="flex-end">
        {renderInfo}

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
          }}
        >
          {renderBody}
        </Stack>
      </Stack>
    </Stack>
  );
}
