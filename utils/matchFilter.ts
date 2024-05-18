import { IMatchItem } from "#/types/match";
import { addDays, endOfDay, startOfDay, subDays } from "date-fns";
import { fDate, formatStringToDateTime } from "./format-time";

export const filterMatchByDate = (baseDate: Date, daysToAdd: number) => (matches: IMatchItem[]) => {
  const targetDate = new Date(baseDate);
  targetDate.setDate(targetDate.getDate() + daysToAdd);

  const formattedTargetDate = fDate(targetDate);

  return matches.filter((match) => {
    // Splitting match.startTimez into components
    const [matchMonth, matchDay, matchYearTime] = match.startTimez.split("-");
    const [matchYear, matchTime] = matchYearTime.split("T");
    const matchTimeParts = matchTime.split(":");

    // Constructing formatted date string
    const formattedMatchDate = `${matchMonth}/${matchDay}/${matchYear}`;


    return formattedMatchDate === formattedTargetDate;
  });
};

export function filterYesterdayMatches(matches: IMatchItem[]) {
  const yesterday = subDays(new Date(), 1); // Get yesterday's date
  const startOfYesterday = startOfDay(yesterday);
  const endOfYesterday = endOfDay(yesterday);

  return matches.filter((match) => {
    const matchStartTime = formatStringToDateTime(match.startTimez);
    return matchStartTime >= startOfYesterday && matchStartTime <= endOfYesterday;
  });
}

export function filterTodayMatches(matches: IMatchItem[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);


  return matches
    .filter((match) => {
      const matchStartTime = formatStringToDateTime(match.startTimez);
      return matchStartTime >= today && matchStartTime <= endOfDay;
    })
    ;
}

export function filterTomorrowMatches(matches: IMatchItem[]) {
  const tomorrow = new Date();
  // Get tomorrow's date by adding 1 to the current date
  tomorrow.setDate(tomorrow.getDate() + 1);
  // Set the time to the start of tomorrow
  tomorrow.setHours(0, 0, 0, 0);
  // Set the time to the end of tomorrow
  const endOfTomorrow = new Date(tomorrow);
  endOfTomorrow.setHours(23, 59, 59, 999);

  return matches
    .filter((match) => {
      const matchStartTime = formatStringToDateTime(match.startTimez);
      return matchStartTime >= tomorrow && matchStartTime <= endOfTomorrow;
    })
    ;
}
export function filterMatchesByLeagueTitle(matches: IMatchItem[], leagueTitle: string) {
  if (leagueTitle !== "all") {
    return matches.filter(match => match.league_title.toLowerCase().includes(leagueTitle.toLowerCase()))
  } else {
    return matches
  }
}


export function filterLiveMatches(matches: IMatchItem[]) {
  const currentTime = new Date();
  const endTimeThreshold = new Date(currentTime.getTime() + 120 * 60000); // 105 minutes in milliseconds

  return matches
    .filter((match) => {
      return isMatchOngoing(match, currentTime, endTimeThreshold);
    });
}

export function isMatchOngoing(match: IMatchItem, currentTime: Date, endTimeThreshold: Date) {
  const matchStartTime = formatStringToDateTime(match.startTimez);
  const matchEndTime = new Date(matchStartTime.getTime() + 120 * 60000);
  return matchStartTime <= currentTime && currentTime <= matchEndTime;
}

export function filterAllTimeMatches(matches: IMatchItem[]) {
  const currentTime = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = subDays(today, 1);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const startOfYesterday = startOfDay(yesterday);
  const endOfYesterday = endOfDay(yesterday);
  const endOfToday = endOfDay(currentTime);
  const endOfTomorrow = endOfDay(tomorrow);
  const endTimeThreshold = new Date(currentTime.getTime() + 105 * 60000);

  return matches.filter((match) => {
    const matchStartTime = formatStringToDateTime(match.startTimez);
    return (
      isMatchOngoing(match, currentTime, endTimeThreshold) ||
      (matchStartTime >= startOfYesterday && matchStartTime <= endOfYesterday) ||
      (matchStartTime >= today && matchStartTime <= endOfToday) ||
      (matchStartTime >= tomorrow && matchStartTime <= endOfTomorrow)
    );
  });
}
export function filterTodayAndLiveMatches(matches: IMatchItem[]) {
  const currentTime = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfToday = endOfDay(currentTime);
  const endTimeThreshold = new Date(currentTime.getTime() + 105 * 60000); // 105 minutes in milliseconds

  return matches.filter((match) => {
    const matchStartTime = formatStringToDateTime(match.startTimez);
    return (
      isMatchOngoing(match, currentTime, endTimeThreshold) ||
      (matchStartTime >= today && matchStartTime <= endOfToday)
    );
  });
}
export function filterFourDaysLaterMatches(matches: IMatchItem[]) {
  const today = new Date();
  const fourDaysLater = addDays(today, 4);

  return matches.filter((match) => {
    const matchDate = new Date(match.startTimez);
    return matchDate >= today && matchDate <= fourDaysLater;
  });
}
