import { sub } from 'date-fns';

import { ASSETS_API } from '#/config-global';

// ----------------------------------------------------------------------

export const _mock = {

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
