import { sub } from 'date-fns';


import {
  _id,
  _nativeS,
  _nativeM,
  _nativeL,
  _booleans,
  _competition,
  _soccerTeams,
  _postTitles,
  _descriptions,
  _fullNames,
  _roles,
} from './assets';
import { ASSETS_API } from '#/config-global';

// ----------------------------------------------------------------------

export const _mock = {
  id: (index: number) => _id[index],
  boolean: (index: number) => _booleans[index],
  role: (index: number) => _roles[index],
  fullName: (index: number) => _fullNames[index],
  competition: (index: number) => _competition[index],
  time: (index: number) => sub(new Date(), { days: index, hours: index }),
  team: (index: number) => _soccerTeams[index],
  postTitle: (index: number) => _postTitles[index],
  description: (index: number) => _descriptions[index],
  // Number
  number: {
    nativeS: (index: number) => _nativeS[index],
    nativeM: (index: number) => _nativeM[index],
    nativeL: (index: number) => _nativeL[index],
  },
  // Image
  image: {
    cover: (index: number) => `${ASSETS_API}/assets/images/cover/cover_${index + 1}.jpg`,
    avatar: (index: number) => `${ASSETS_API}/assets/images/avatar/avatar_${index + 1}.jpg`,
    travel: (index: number) => `${ASSETS_API}/assets/images/travel/travel_${index + 1}.jpg`,
    company: (index: number) => `${ASSETS_API}/assets/images/company/company_${index + 1}.png`,
    product: (index: number) => `${ASSETS_API}/assets/images/m_product/product_${index + 1}.jpg`,
    career: (index: number) => `/assets/images/news/career_${index + 1}.jpg`,
    course: (index: number) => `/assets/images/course/course_${index + 1}.jpg`,
    marketing: (index: number) => `/assets/images/marketing/marketing_${index + 1}.jpg`,
    portrait: (index: number) => `${ASSETS_API}/assets/images/portrait/portrait_${index + 1}.jpg`,
  },
};
