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


import { useCallback, useEffect, useState } from 'react';
import { mutate } from 'swr';
import { ConfirmDialog } from '#/components/custom-dialog';
import { Button, MenuItem, Typography } from '@mui/material';
import { useBoolean } from '#/hooks/use-boolean';
import { ILivestreamItem } from '#/types/livestream';
import { useDeleteLivestream } from '#/api/livestream';
import resposneData from '#/public/responseData.json'
import { IMatchItem } from '#/types/match';
import QueryString from 'qs';
import { axiosSoccer } from '#/utils/axios';
import { SOCCER_API } from '#/config-global';

// ----------------------------------------------------------------------

type Props = {
  livestream: ILivestreamItem;
  endpoints?: string;
};

export default function LivestreamlivestreamHorizontal({ livestream, endpoints }: Props) {
  const popover = usePopover();

  const [matches, setMatches] = useState<IMatchItem[]>([]);
  const [matchingLivestream, setMatchingLivestream] = useState<IMatchItem>();


  const router = useRouter();

  const confirm = useBoolean();

  const {
    id,
    title,
    content,
    meta,
    createdAt,
  } = livestream;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = QueryString.stringify({
          'type': '1'
        });
        const response = await axiosSoccer.post(SOCCER_API as string, data);
        // Handle success
        setMatches(response.data.data.list);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const currentMatch = matches.find(match => match.matchId === livestream?.title);

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


          </Stack>

          <Stack spacing={1}>
            {currentMatch ? (
              <Link color="inherit" component={RouterLink} href={paths.dashboard.livestream.details(id)}>
                <TextMaxLine color="black" variant="subtitle2" line={2}>{currentMatch?.localteam_title} vs {currentMatch?.visitorteam_title}
                </TextMaxLine>
              </Link>
            ) : (

              <Typography variant="h3" sx={{ mt: 4 }}>Loading...</Typography>
            )}


          </Stack>
        </Stack>
        <Box>
          <IconButton sx={{ textAlign: "start", mt: 2 }} color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Box>
        {smUp && (
          <Box
            sx={{
              position: 'relative',
              p: 1,
              minWidth: "164px",
              maxHeight: "107px"
            }}
          >
            <Image alt={title} src="/assets/images/match/background-item.jpg" sx={{
              borderRadius: 1.5, height: 1, width: 1
            }} />
          </Box>
        )}
      </Stack >

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >

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
        title="Xóa"
        content={"Bạn chắc chắn muốn xóa?"}
        action={
          <Button variant="contained" color="error" onClick={() => handleDeleteLivestream(id)}>
            Xóa
          </Button>
        }
      />
    </>
  );
}
