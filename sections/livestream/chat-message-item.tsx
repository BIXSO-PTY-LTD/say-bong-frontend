
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



import { IAuthor, ICommentItem } from '#/types/chat';
import { useAuthContext } from '#/auth/hooks';
import { Avatar, Box } from '@mui/material';
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

  // const renderInfo = (
  //   <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>

  //     <Typography
  //       noWrap
  //       variant="caption"
  //       sx={{
  //         color: 'text.disabled',
  //         ...(!isMe && {
  //           mr: 'auto',
  //         }),
  //       }}
  //     >
  //       {!isMe && `${comment.author.userName}`} &nbsp;

  //     </Typography>
  //   </Stack>
  // );

  const renderBody = (
    <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
      {!isMe && <Avatar
        alt={user?.userName}
        sx={{
          mr: 1,
          width: 40,
          height: 40,
          border: 'none',
          fontSize: (theme) => theme.typography.body2
        }}
      >
        {user?.fullName?.charAt(0).toUpperCase()}
      </Avatar>
      }
      <Box
        sx={{
          p: 1.5,
          minWidth: 48,
          maxWidth: 200,
          borderRadius: 1,
          wordWrap: 'break-word',
          typography: 'body1',
          bgcolor: '#131C2F',
          ...(isMe && {
            bgcolor: '#1B2436',
          })
        }}
      >

        {comment.content}
      </Box>
      {isMe && <Avatar
        alt={user?.userName}
        sx={{
          ml: 1,
          width: 40,
          height: 40,
          border: 'none',
          fontSize: (theme) => theme.typography.body2
        }}
      >
        {user?.fullName?.charAt(0).toUpperCase()}
      </Avatar>
      }
    </Stack>
  );


  return (
    <Stack direction="row" justifyContent={isMe ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>

      <Stack>
        {/* {renderInfo} */}

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
