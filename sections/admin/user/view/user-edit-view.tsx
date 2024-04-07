'use client';

import Container from '@mui/material/Container';

import { paths } from '#/routes/paths';


import { useSettingsContext } from '#/components/settings';

import { _userList } from '#/_mock/_user';
import { Typography } from '@mui/material';
import UserNewEditForm from '../user-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function UserEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h3" sx={{
        mb: { xs: 3, md: 5 },
      }}>Thông tin người dùng</Typography>
      <UserNewEditForm currentUser={currentUser} />
    </Container>
  );
}
