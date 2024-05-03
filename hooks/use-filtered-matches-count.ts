import { IMatchItem } from "#/types/match";
import { filterLiveMatches, filterMatchesByLeagueTitle, filterTodayMatches, filterTomorrowMatches } from "#/utils/matchFilter";
import { useEffect, useState } from "react";

export const useFilteredMatchesCount = (matches: IMatchItem[], filters: any, matchesPerPage: number) => {
  const [filteredMatchesCount, setFilteredMatchesCount] = useState<number>(0);

  useEffect(() => {
    let filteredMatches: IMatchItem[] = [];

    switch (filters.matchStatus) {
      case 'today':
        filteredMatches = filterMatchesByLeagueTitle(filterTodayMatches(matches), filters.league_title);
        break;
      case 'tomorrow':
        filteredMatches = filterMatchesByLeagueTitle(filterTomorrowMatches(matches), filters.league_title);
        break;
      case 'live':
        filteredMatches = filterMatchesByLeagueTitle(filterLiveMatches(matches), filters.league_title);
        break;
      default:
        filteredMatches = filterMatchesByLeagueTitle(matches, filters.league_title);
        break;
    }

    setFilteredMatchesCount(Math.ceil(filteredMatches.length / matchesPerPage));
  }, [matches, filters, matchesPerPage]);

  return filteredMatchesCount;
};