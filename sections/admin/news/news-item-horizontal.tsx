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

import { IBlogPostProps } from '#/types/blog';
import { INewsItem } from '#/types/news';
import { _mock } from '#/_mock';

// ----------------------------------------------------------------------

type Props = {
  item: INewsItem;
};

export default function PostItemHorizontal({ item }: Props) {
  const popover = usePopover();

  const router = useRouter();

  const smUp = useResponsive('up', 'sm');

  const {
    id,
    title,
    createdAt,
  } = item;

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
            <Link color="inherit" component={RouterLink} href={paths.dashboard.news.details(id)}>
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
            <Image alt={title} src={_mock.image.cover(0)} sx={{
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
            router.push(paths.dashboard.news.details(id));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}
