// ----------------------------------------------------------------------
const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/admin',
};

export const paths = {
  home: "/",
  livestream: {
    root: "/livestream",
    details: (id: string) => `/livestream/${id}`,
  },
  highlight: {
    root: "/highlight",
    details: (id: string) => `/highlight/${id}`,

  },
  exciting: {
    details: (Id: string) => `/highlight/exciting/${Id}`,
  },
  bxh: {
    root: "/bxh"
  },
  result: {
    root: "/result"
  },
  schedule: {
    root: "/schedule"
  },
  news: {
    root: "/news",
    details: (id: string) => `/news/${id}`,
  },
  account: {
    root: "/account"
  },
  auth: {
    login: `${ROOTS.AUTH}/login`,
  },
  dashboard: {
    root: '/',
    customer: {
      root: `${ROOTS.DASHBOARD}/customer`,
      details: (id: string) => `${ROOTS.DASHBOARD}/customer/${id}`,
    },
    news: `${ROOTS.DASHBOARD}/news`,
    video: {
      root: `${ROOTS.DASHBOARD}/video`,
      highlight: `${ROOTS.DASHBOARD}/video/highlight`,
    },
    api: `${ROOTS.DASHBOARD}/api`,
    livestream: `${ROOTS.DASHBOARD}/livestream`,
    password: `${ROOTS.DASHBOARD}/password`,
    user: {
      edit: (id: string) => `${ROOTS.DASHBOARD}/edit/${id}`
    }
  }
};
