import { IMatchItem } from "#/types/match";
import { addDays, endOfDay, startOfDay, subDays } from "date-fns";
import { convertTimestampToDate, fDate, formatStringToDateTime } from "./format-time";

const isArray = (value: any): value is IMatchItem[] => Array.isArray(value);

export const filterMatchByDate = (baseDate: Date, daysToAdd: number) => (matches: IMatchItem[]) => {
  if (!isArray(matches)) {
    console.error('Expected matches to be an array, but received:', matches);
    return [];
  }

  const targetDate = new Date(baseDate);
  targetDate.setDate(targetDate.getDate() + daysToAdd);

  const formattedTargetDate = fDate(targetDate);

  return matches.filter((match) => {
    const [matchMonth, matchDay, matchYearTime] = match.startTimez.split("-");
    const [matchYear, matchTime] = matchYearTime.split("T");
    const matchTimeParts = matchTime.split(":");

    const formattedMatchDate = `${matchMonth}/${matchDay}/${matchYear}`;

    return formattedMatchDate === formattedTargetDate;
  });
};

export function filterYesterdayMatches(matches: IMatchItem[]) {
  if (!isArray(matches)) {
    console.error('Expected matches to be an array, but received:', matches);
    return [];
  }

  const yesterday = subDays(new Date(), 1);
  const startOfYesterday = startOfDay(yesterday);
  const endOfYesterday = endOfDay(yesterday);

  return matches.filter((match) => {
    const matchStartTime = formatStringToDateTime(match.startTimez);
    return matchStartTime >= startOfYesterday && matchStartTime <= endOfYesterday;
  });
}

export function filterTodayMatches(matches: IMatchItem[]) {
  if (!isArray(matches)) {
    console.error('Expected matches to be an array, but received:', matches);
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  return matches.filter((match) => {
    const matchStartTime = formatStringToDateTime(match.startTimez);
    return matchStartTime >= today && matchStartTime <= endOfDay;
  });
}

export function filterTomorrowMatches(matches: IMatchItem[]) {
  if (!isArray(matches)) {
    console.error('Expected matches to be an array, but received:', matches);
    return [];
  }

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const endOfTomorrow = new Date(tomorrow);
  endOfTomorrow.setHours(23, 59, 59, 999);

  return matches.filter((match) => {
    const matchStartTime = formatStringToDateTime(match.startTimez);
    return matchStartTime >= tomorrow && matchStartTime <= endOfTomorrow;
  });
}

export function filterMatchesByLeagueTitle(matches: IMatchItem[], leagueTitle: string) {
  if (!isArray(matches)) {
    console.error('Expected matches to be an array, but received:', matches);
    return [];
  }

  if (leagueTitle !== "all") {
    return matches.filter(match => match.league_title.toLowerCase().includes(leagueTitle.toLowerCase()));
  } else {
    return matches;
  }
}

export function filterLiveMatches(matches: IMatchItem[]) {
  if (!isArray(matches)) {
    console.error('Expected matches to be an array, but received:', matches);
    return [];
  }

  const currentTime = new Date();
  const endTimeThreshold = new Date(currentTime.getTime() + 120 * 60000); // 105 minutes in milliseconds

  return matches.filter((match) => {
    return isMatchOngoing(match, currentTime, endTimeThreshold);
  });
}

export function isMatchOngoing(match: IMatchItem, currentTime: Date, endTimeThreshold: Date) {
  const matchStartTime = formatStringToDateTime(match.startTimez);
  const matchEndTime = new Date(matchStartTime.getTime() + 120 * 60000);
  return matchStartTime <= currentTime && currentTime <= matchEndTime;
}

export function filterAllTimeMatches(matches: IMatchItem[]) {
  if (!isArray(matches)) {
    console.error('Expected matches to be an array, but received:', matches);
    return [];
  }

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
  if (!isArray(matches)) {
    console.error('Expected matches to be an array, but received:', matches);
    return [];
  }

  const currentTime = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfToday = endOfDay(currentTime);
  const endTimeThreshold = new Date(currentTime.getTime() + 105 * 60000);

  return matches.filter((match) => {
    const matchStartTime = formatStringToDateTime(match.startTimez);
    return (
      isMatchOngoing(match, currentTime, endTimeThreshold) ||
      (matchStartTime >= today && matchStartTime <= endOfToday)
    );
  });
}

export function filterFourDaysLaterMatches(matches: IMatchItem[]) {
  if (!isArray(matches)) {
    console.error('Expected matches to be an array, but received:', matches);
    return [];
  }

  const today = new Date();
  const fourDaysLater = addDays(today, 4);

  return matches.filter((match) => {
    const matchDate = new Date(match.startTimez);
    return matchDate >= today && matchDate <= fourDaysLater;
  });
}

export const getMatchStatus = (matchTime: number, halfStartTime: number) => {
  const matchStartTime = convertTimestampToDate(matchTime);
  const halfStartTimeDate = convertTimestampToDate(halfStartTime);

  const currentTime = new Date();
  const elapsedTime = (currentTime.getTime() - matchStartTime.getTime()) / (1000 * 60);

  if (currentTime.getTime() < matchStartTime.getTime()) {
    return { round: "Chưa bắt đầu", time: "" };
  } else if (elapsedTime <= 45) {
    return { round: "Hiệp 1", time: `${Math.floor(elapsedTime)}'` };
  } else if (elapsedTime <= 60) {
    return { round: "Nghỉ giữa hiệp", time: `` };
  } else if (elapsedTime <= 120) {
    const halfTimeElapsed = elapsedTime - 15;
    return { round: "Hiệp 2", time: `${Math.floor(halfTimeElapsed)}'` };
  } else {
    return { round: "Đã kết thúc", time: `` };
  }
};