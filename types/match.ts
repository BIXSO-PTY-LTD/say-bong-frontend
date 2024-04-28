
// ----------------------------------------------------------------------

export type IMatchFilterValue = string | string[];

export type IMatchFilters = {
  league_title: string;
  matchStatus: string;
};
export type IRankFilters = {
  league_title: string;
};

export type IMatchItem = {
  matchId: string;
  status: number;
  key_sync: string;
  hide: number;
  startTime: string;
  startTimez: string;
  timestamp: number;
  league_id: string;
  league_title: string;
  localteam_title: string;
  localteam_logo: string;
  visitorteam_title: string;
  visitorteam_logo: string;
  hot: string;
  score: string;
  flv: string;
  m3u8: string;
  links1: string;
  links2: string;
  links3: string;
  h5: string;
}

// ----------------------------------------------------------------------

