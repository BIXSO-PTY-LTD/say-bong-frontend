
// ----------------------------------------------------------------------

export type IMatchFilterValue = string | string[];

export type IMatchFilters = {
  competition: string;
  status: string;
};

export type IMatchItem = {
  id: string;
  competition: string;
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

