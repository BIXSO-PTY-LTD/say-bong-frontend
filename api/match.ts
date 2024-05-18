import { MATCH_API, SOCCER_API } from '#/config-global';
import { IMatchItem, IMatchResults } from '#/types/match';
import { axiosSoccer, hostFetcher } from '#/utils/axios';
import axios, { AxiosRequestConfig } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import QueryString from 'qs';
import { useMemo } from 'react';
import useSWR from 'swr';


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
  const URL = `/api/v1/addon/schedule`;

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      matches: (data?.list as IMatchItem[]) || [],
      paginate: data || [],
      matchesLoading: isLoading,
      matchesError: error,
      matchesValidating: isValidating,
      matchesEmpty: !isLoading && !data?.list.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}