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
    },
    news: {
      special: {
        root: `${ROOTS.DASHBOARD}/news/special`,
        new: `${ROOTS.DASHBOARD}/news/special/new`,
        details: (id: string) => `${ROOTS.DASHBOARD}/news/special/${id}`,
      },
      normal: {
        root: `${ROOTS.DASHBOARD}/news/normal`,
        new: `${ROOTS.DASHBOARD}/news/normal/new`,
        details: (id: string) => `${ROOTS.DASHBOARD}/news/normal/${id}`,
      },
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
    livestream: {
      root: `${ROOTS.DASHBOARD}/livestream`,
      new: `${ROOTS.DASHBOARD}/livestream/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/livestream/${id}`,
    },
    password: `${ROOTS.DASHBOARD}/change-password`,

  }
};
