import { _mock } from ".";

export const MATCH_STATUS_OPTIONS = [
  { value: 'live', label: 'Đang Đá' },
  { value: 'hot', label: 'Trận Hot' },
  { value: 'today', label: 'Hôm Nay' },
  { value: 'tomorrow', label: 'Ngày Mai' },
];
export const MATCH_RESULT_OPTIONS = [
  { value: 'live', label: 'Đang Đá' },
  { value: 'hot', label: 'Trận Hot' },
  { value: 'today', label: 'Hôm Nay' },
];

export const COMPETITION_SORT_OPTIONS = [
  { value: 'FIFA World Cup', label: 'FIFA World Cup' },
  { value: 'UEFA European Championship (Euro)', label: 'UEFA European Championship (Euro)' },
  { value: 'Copa America', label: 'Copa America' },
  { value: 'UEFA Champions League', label: 'UEFA Champions League' },
  { value: 'UEFA Europa League', label: 'UEFA Europa League' },
  { value: 'English Premier League', label: 'English Premier League' },
  { value: 'La Liga (Spain)', label: 'La Liga (Spain)' },
  { value: 'Bundesliga (Germany)', label: 'Bundesliga (Germany)' },
  { value: 'Serie A (Italy)', label: 'Serie A (Italy)' },
  { value: 'Ligue 1 (France)', label: 'Ligue 1 (France)' },
  { value: 'Brasileirão (Brazil)', label: 'Brasileirão (Brazil)' },
  { value: 'Argentine Primera División', label: 'Argentine Primera División' },
  { value: 'MLS (Major League Soccer - USA)', label: 'MLS (Major League Soccer - USA)' },
  { value: 'AFC Asian Cup', label: 'AFC Asian Cup' },
  { value: 'Africa Cup of Nations', label: 'Africa Cup of Nations' }
];

export const _matchList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  competition: _mock.competition(index),
  status: (index % 2 && 'live') || (index % 3 && 'hot') || (index % 4 && 'today') || 'tomorrow',
  date_time: _mock.time(index),
  home_team: _mock.team(index),
  away_team: _mock.team(index + 1),
  home_image: _mock.image.avatar(index),
  away_image: _mock.image.avatar(index + 1),
  home_score: _mock.number.nativeS(index),
  away_score: _mock.number.nativeS(index),
  round: (index % 2 && 1) || 2,
  minute: (index % 2 && 20) || (index % 2 && 40) || 76,
  image: _mock.image.cover(index),
}))