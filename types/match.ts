
// ----------------------------------------------------------------------

export type IMatchFilterValue = string | string[];

export type IMatchFilters = {
  competitions: string[];
  status: string;
};

export type IMatchItem = {
  id: string;
  competitions: string;
  status: string;
  date_time: Date;
  home_team: string;
  home_image: string;
  away_team: string;
  away_image: string;
  home_score: number;
  away_score: number;
  round: number;
  minute: number;
  image: string;
}

// ----------------------------------------------------------------------

