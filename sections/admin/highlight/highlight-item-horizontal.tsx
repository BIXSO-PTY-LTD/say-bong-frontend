import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { paths } from '#/routes/paths';
import { useRouter } from '#/routes/hooks';
import { RouterLink } from '#/routes/components';

import { useResponsive } from '#/hooks/use-responsive';

import { fDate } from '#/utils/format-time';
import { fShortenNumber } from '#/utils/format-number';

import Label from '#/components/label';
import Image from '#/components/image';
import Iconify from '#/components/iconify';
import TextMaxLine from '#/components/text-max-line';
import CustomPopover, { usePopover } from '#/components/custom-popover';

import { ITourProps } from '#/types/tour';
import { IVideoItem } from '#/types/video';
import { _mock } from '#/_mock';
import { useBoolean } from '#/hooks/use-boolean';
import { mutate } from 'swr';
import { useCallback } from 'react';
import { useDeleteHighlightVideo } from '#/api/highlight-video';
import { ConfirmDialog } from '#/components/custom-dialog';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  highlight: IVideoItem;
  endpoints?: string;
};

export default function HighlightItemHorizontal({ highlight, endpoints }: Props) {
  const popover = usePopover();

  const confirm = useBoolean();

  const router = useRouter();

  const smUp = useResponsive('up', 'sm');
  const deleteVideo = useDeleteHighlightVideo();

  const handleDeleteVideo = useCallback(
    async (id: string) => {
      try {
        await deleteVideo(id);
        confirm.onFalse();
        mutate(endpoints);
      } catch (error) {
        console.error('Error deleting Video:', error);
      }
    },
    [deleteVideo, confirm, endpoints]
  );
  const {
    id,
    title,
    content,
  } = highlight;

  return (
    <>
      <Stack component={Card} justifyContent="space-between" sx={{ background: "#fff" }} direction="row">
        <Stack
          sx={{
            width: "100%",
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {title}
            </Box>

            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>

          <Stack spacing={1}>
            <Link color="inherit" component={RouterLink} href={paths.dashboard.video.highlight.details(id)}>
              <TextMaxLine color="black" variant="subtitle2" line={2}>
                {content}
              </TextMaxLine>
            </Link>
          </Stack>
        </Stack>

        {smUp && (
          <Box
            sx={{
              position: 'relative',
              p: 1,
              width: "164px"
            }}
          >
            <Image alt={title} src={_mock.image.cover(0)} sx={{
              borderRadius: 1.5,
            }} />
          </Box>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.video.highlight.details(id));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Xóa
        </MenuItem>
      </CustomPopover>
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={"Bạn chắc chắn muốn xóa?"}
        action={
          <Button variant="contained" color="error" onClick={() => handleDeleteVideo(id)}>
            Xóa
          </Button>
        }
      />
    </>
  );
}
