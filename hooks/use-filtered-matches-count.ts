import { IMatchItem } from "#/types/match";
import { fDate } from "#/utils/format-time";
import { filterLiveMatches, filterMatchByDate, filterMatchesByLeagueTitle, filterTodayMatches, filterTomorrowMatches, filterYesterdayMatches } from "#/utils/matchFilter";
import { addDays } from "date-fns";
import { useEffect, useState } from "react";

export const useFilteredMatchesCount = (matches: IMatchItem[], filters: any, matchesPerPage: number) => {
  const [filteredMatchesCount, setFilteredMatchesCount] = useState<number>(0);
  const today = new Date();
  useEffect(() => {
    let filteredMatches: IMatchItem[] = [];

    switch (filters.matchStatus) {
      case 'yesterday':
        filteredMatches = filterMatchesByLeagueTitle(filterYesterdayMatches(matches), filters.league_title);
        break;
      case 'today':
        filteredMatches = filterMatchesByLeagueTitle(filterTodayMatches(matches), filters.league_title);
        break;
      case 'tomorrow':
        filteredMatches = filterMatchesByLeagueTitle(filterTomorrowMatches(matches), filters.league_title);
        break;
      case 'live':
        filteredMatches = filterMatchesByLeagueTitle(filterLiveMatches(matches), filters.league_title);
        break;
      case fDate(addDays(today, 2)):
        filteredMatches = filterMatchesByLeagueTitle(filterMatchByDate(today, 2)(matches), filters.league_title);
        break;
      case fDate(addDays(today, 3)):
        filteredMatches = filterMatchesByLeagueTitle(filterMatchByDate(today, 3)(matches), filters.league_title);
        break;
      case fDate(addDays(today, 4)):
        filteredMatches = filterMatchesByLeagueTitle(filterMatchByDate(today, 4)(matches), filters.league_title);
        break;
      case fDate(addDays(today, 5)):
        filteredMatches = filterMatchesByLeagueTitle(filterMatchByDate(today, 5)(matches), filters.league_title);
        break;
      default:
        filteredMatches = filterMatchesByLeagueTitle(matches, filters.league_title);
        break;
    }

    setFilteredMatchesCount(Math.ceil(filteredMatches.length / matchesPerPage));
  }, [matches, filters, matchesPerPage, today]);

  return filteredMatchesCount;
};