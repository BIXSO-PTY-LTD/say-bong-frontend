import { _mock } from ".";

export const MATCH_STATUS_OPTIONS = [
  { value: 'live', label: 'Đang Đá' },
  { value: 'hot', label: 'Trận Hot' },
  { value: 'today', label: 'Hôm Nay' },
  { value: 'tomorrow', label: 'Ngày Mai' },
];

export const COMPETITION_SORT_OPTIONS = [
  { value: 'fifa world cup', label: 'FIFA World Cup' },
  { value: 'uefa european championship (euro)', label: 'UEFA (Euro)' },
  { value: 'copa america', label: 'Copa America' },
  { value: 'uefa champions league', label: 'UEFA Champions League' },
  { value: 'uefa europa league', label: 'UEFA Europa League' },
  { value: 'english premier league', label: 'English Premier League' },
  { value: 'la liga (spain)', label: 'La Liga (Spain)' },
  { value: 'bundesliga (germany)', label: 'Bundesliga (Germany)' },
  { value: 'serie a (italy)', label: 'Serie A (Italy)' },
  { value: 'ligue 1 (france)', label: 'Ligue 1 (France)' },
  { value: 'brasileirão (brazil)', label: 'Brasileirão (Brazil)' },
  { value: 'argentine primera división', label: 'Argentine Primera División' },
  { value: 'mls (major league soccer - usa)', label: 'MLS (Major League Soccer - USA)' },
  { value: 'afc asian cup', label: 'AFC Asian Cup' },
  { value: 'africa cup of nations', label: 'Africa Cup of Nations' }
];

export const _matchList = [...Array(20)].map((_, index) => ({
  id: _mock.id(index),
  competitions: _mock.competition(index),
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
  image: _mock.image.cover(index)
}))