// ----------------------------------------------------------------------

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
    details: (Id: string) => `highlight/exciting/${Id}`,
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
  }

};
