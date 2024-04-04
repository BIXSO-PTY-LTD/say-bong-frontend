import { countries } from '#/assets/data';

import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const _userList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  username: 'trucquynh1209',
  createdAt: _mock.time(index),
  name: 'Phạm Thụy Trúc Quỳnh',
  avatarUrl: _mock.image.avatar(index),
  phoneNumber: _mock.phoneNumber(index),
}));
