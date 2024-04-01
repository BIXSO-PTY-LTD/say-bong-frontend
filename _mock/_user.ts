import { countries } from '#/assets/data';

import { _mock } from './_mock';

// ----------------------------------------------------------------------






export const _teamList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  zipCode: '85807',
  state: 'Virginia',
  city: 'Rancho Cordova',
  role: _mock.role(index),
  address: '908 Jack Locks',
  name: _mock.fullName(index),
  isVerified: _mock.boolean(index),
  country: countries[index + 1].label,
  avatarUrl: _mock.image.avatar(index),
  competition: _mock.competition(index),
  phoneNumber: "1",
  status:
    ["W", "L", "D", "W", "W"]
}));
