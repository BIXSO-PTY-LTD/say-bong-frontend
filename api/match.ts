import { IMatchResults } from '#/types/match';
import useSWR from 'swr';

export interface ILivestreamItem {
  // Define your interface properties here based on the data structure returned by the API
}

export function useGetMatch(matchId: string | undefined) {
  const endpoints = `https://1647117064.global.cdnfastest.com/h2h`


  const hostFetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };

  const URL = matchId ? `${endpoints}/${matchId}` : '';

  const { data, error, isValidating } = useSWR(URL, hostFetcher);

  const matchLoading = !data && !error;

  const memoizedValue = {
    match: data?.results as IMatchResults,
    matchLoading,
    matchError: error,
    matchValidating: isValidating,
  };

  return memoizedValue;
}
