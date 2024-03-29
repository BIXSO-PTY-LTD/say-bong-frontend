import { formatDistanceToNowStrict } from 'date-fns';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useMockedUser } from '#/hooks/use-mocked-user';

import Iconify from '#/components/iconify';

import { IChatMessage, IChatParticipant } from '#/types/chat';
import useGetMessage from '#/hooks/use-get-message';


// ----------------------------------------------------------------------

type Props = {
  message: IChatMessage;
  participants: IChatParticipant[];
  onOpenLightbox: (value: string) => void;
};

export default function ChatMessageItem({ message, participants, onOpenLightbox }: Props) {
  const { user } = useMockedUser();

  const { me, senderDetails, hasImage } = useGetMessage({
    message,
    participants,
    currentUserId: `${user?.id}`,
  });

  const { firstName } = senderDetails;

  const { body, createdAt } = message;

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...(!me && {
          mr: 'auto',
        }),
      }}
    >
      {!me && `${firstName},`} &nbsp;
      {formatDistanceToNowStrict(new Date(createdAt), {
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
        ...(me && {
          color: 'grey.800',
          bgcolor: 'primary.lighter',
        }),
        ...(hasImage && {
          p: 0,
          bgcolor: 'transparent',
        }),
      }}
    >
      {hasImage ? (
        <Box
          component="img"
          alt="attachment"
          src={body}
          onClick={() => onOpenLightbox(body)}
          sx={{
            minHeight: 220,
            borderRadius: 1.5,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        />
      ) : (
        body
      )}
    </Stack>
  );


  return (
    <Stack direction="row" justifyContent={me ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
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
