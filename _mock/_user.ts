import { countries } from '#/assets/data';

import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _userList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  username: 'customer',
  createdAt: _mock.time(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
  phoneNumber: _mock.phoneNumber(index),
}));
