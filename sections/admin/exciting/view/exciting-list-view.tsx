'use client';

import { Button, Container, Pagination, Stack, Typography, paginationClasses } from '@mui/material';
import { _careerPosts, _marketingPosts } from '#/_mock/_blog';
import { _tours } from '#/_mock';
import { useSettingsContext } from '#/components/settings';
import { _userList } from '#/_mock/_user';
import Iconify from '#/components/iconify';
import { paths } from '#/routes/paths';
import { RouterLink } from '#/routes/components';
import { ITourProps, ITourTableFilters } from '#/types/tour';
import ExcitingListHorizontal from '../exciting-list-horizontal';

// ----------------------------------------------------------------------


const defaultFilters: ITourTableFilters = {
  title: '',
};

export default function ExcitingListView() {
  const settings = useSettingsContext();

  const dataFiltered = applyFilter({
    inputData: _tours,
  });






  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Stack direction="row" justifyContent="space-between" sx={{
        mb: { xs: 3, md: 5 }
      }}>
        <Typography variant="h3">Danh sách những pha bóng thú vị</Typography>
        <Button
          component={RouterLink}
          href={paths.dashboard.video.exciting.new}
          variant="contained"
          startIcon={<Iconify icon="mingcute:add-line" />}
        >
          Thêm video
        </Button>
      </Stack>
      <ExcitingListHorizontal news={dataFiltered}
      //  loading={newsLoading} 
      />

      <Pagination
        count={10}
        color="primary"
        sx={{
          my: 10,
          [`& .${paginationClasses.ul}`]: {
            justifyContent: 'center',
          },
        }}
      />
    </Container >
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
}: {
  inputData: ITourProps[];
}) {

  return inputData;
}
