// ----------------------------------------------------------------------

export const paths = {
  home: "/",
  livestream: {
    root: "/livestream",
    details: (id: string) => `/livestream/${id}`,
  },
  highlight: {
    root: "/highlight"
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
    details: "/news/details"
  }

};
