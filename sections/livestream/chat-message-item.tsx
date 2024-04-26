
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



import { IAuthor, ICommentItem } from '#/types/chat';
import { useAuthContext } from '#/auth/hooks';
import { Avatar } from '@mui/material';
import { ThemeContext } from '@emotion/react';


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
    <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
      {!isMe && <Avatar
        alt={user?.userName}
        sx={{
          mr: 1,
          width: 27,
          height: 27,
          border: (theme) => `solid 2px ${theme.palette.background.default}`,
          fontSize: (theme) => theme.typography.body2
        }}
      >
        {user?.fullName?.charAt(0).toUpperCase()}
      </Avatar>
      }
      <Typography
        noWrap
        variant="caption"
        sx={{
          color: 'text.disabled',
          ...(!isMe && {
            mr: 'auto',
          }),
        }}
      >
        {!isMe && `${comment.author.userName}`} &nbsp;

      </Typography>
    </Stack>
  );

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 200,
        borderRadius: 1,
        wordWrap: 'break-word',
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

      <Stack>
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
