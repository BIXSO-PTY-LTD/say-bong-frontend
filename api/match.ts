import { MATCH_API, SOCCER_API } from '#/config-global';
import { IMatchResults } from '#/types/match';
import { axiosSoccer } from '#/utils/axios';
import axios, { AxiosRequestConfig } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import QueryString from 'qs';
import useSWR from 'swr';

export interface ILivestreamItem {
  // Define your interface properties here based on the data structure returned by the API
}

export function useGetMatch(matchId: string | undefined) {
  const endpoints = `${MATCH_API}/h2h`


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

export function useGetMatches() {
  const getMatches = async () => {
    try {
      const data = QueryString.stringify({
        'type': '1'
      });

      const response = await axiosSoccer.post(SOCCER_API as string, data);
      console.log(response.data.data.list);

      return response.data.data.list;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data');
    }
  }
  return getMatches;
}