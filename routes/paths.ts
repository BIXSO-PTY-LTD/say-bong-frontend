// ----------------------------------------------------------------------
const ROOTS = {
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
  dashboard: {
    root: '/',
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/user/${id}`,
    },
    news: {
      root: `${ROOTS.DASHBOARD}/news`,
      new: `${ROOTS.DASHBOARD}/news/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/news/${id}`,
    },
    video: {
      exciting: {
        root: `${ROOTS.DASHBOARD}/video/exciting`,
        new: `${ROOTS.DASHBOARD}/video/exciting/new`,
        details: (id: string) => `${ROOTS.DASHBOARD}/video/exciting/${id}`,
      },
      highlight: {
        root: `${ROOTS.DASHBOARD}/video/highlight`,
        new: `${ROOTS.DASHBOARD}/video/highlight/new`,
        details: (id: string) => `${ROOTS.DASHBOARD}/video/highlight/${id}`,
      },
    },
    api: `${ROOTS.DASHBOARD}/api`,
    livestream: `${ROOTS.DASHBOARD}/livestream`,
    password: `${ROOTS.DASHBOARD}/change-password`,

  }
};
