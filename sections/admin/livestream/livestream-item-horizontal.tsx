import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { paths } from '#/routes/paths';
import { useRouter } from '#/routes/hooks';
import { RouterLink } from '#/routes/components';

import { useResponsive } from '#/hooks/use-responsive';

import { fDate } from '#/utils/format-time';

import Image from '#/components/image';
import Iconify from '#/components/iconify';
import TextMaxLine from '#/components/text-max-line';
import CustomPopover, { usePopover } from '#/components/custom-popover';

import { _mock } from '#/_mock';
import { useCallback, useEffect, useState } from 'react';
import { useDeleteNew } from '#/api/news';
import { mutate } from 'swr';
import { ConfirmDialog } from '#/components/custom-dialog';
import { Button, MenuItem } from '@mui/material';
import { useBoolean } from '#/hooks/use-boolean';
import { ILivestreamItem } from '#/types/livestream';
import { useDeleteLivestream } from '#/api/livestream';

// ----------------------------------------------------------------------

type Props = {
  livestream: ILivestreamItem;
  endpoints?: string;
};

export default function LivestreamlivestreamHorizontal({ livestream, endpoints }: Props) {
  const popover = usePopover();

  const router = useRouter();

  const confirm = useBoolean();

  const [firstImageUrl, setFirstImageUrl] = useState('');

  useEffect(() => {
    const regex = /<img.*?src="(.*?)".*?>/;
    const match = livestream.content.match(regex);
    if (match && match[1]) {
      setFirstImageUrl(match[1]);
    }
  }, [livestream.content]);

  const smUp = useResponsive('up', 'sm');
  const deleteLivestream = useDeleteLivestream();

  const handleDeleteLivestream = useCallback(
    async (id: string) => {
      try {
        await deleteLivestream(id);
        confirm.onFalse();
        mutate(endpoints);
      } catch (error) {
        console.error('Error deleting Livestream:', error);
      }
    },
    [deleteLivestream, endpoints, confirm]
  );

  const {
    id,
    title,
    content,
    createdAt,
  } = livestream;

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
              {fDate(createdAt)}
            </Box>

            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Stack>

          <Stack spacing={1}>
            <Link color="inherit" component={RouterLink} href={paths.dashboard.livestream.details(id)}>
              <TextMaxLine color="black" variant="subtitle2" line={2}>
                {title}
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
            <Image alt={title} src={firstImageUrl ? firstImageUrl : _mock.image.cover(0)} sx={{
              borderRadius: 1.5, height: 1
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
            router.push(paths.dashboard.livestream.details(id));
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
          <Button variant="contained" color="error" onClick={() => handleDeleteLivestream(id)}>
            Delete
          </Button>
        }
      />
    </>
  );
}
