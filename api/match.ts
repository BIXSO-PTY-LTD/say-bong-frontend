import { MATCH_API, SOCCER_API } from '#/config-global';
import { IMatchInfo, IMatchItem } from '#/types/match';
import { axiosSoccer, hostFetcher, soccerFetcher } from '#/utils/axios';
import axios, { AxiosRequestConfig } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import QueryString from 'qs';
import { useMemo } from 'react';
import useSWR from 'swr';


export function useGetInfoMatches() {
  const URL = `${SOCCER_API}`

  const { data, error, isValidating } = useSWR(URL, soccerFetcher);

  const matchesInfoLoading = !data && !error;
  const memoizedValue = {
    matchesInfo: data as IMatchInfo[],
    matchesInfoLoading,
    matchesInfoError: error,
    matchesInfoValidating: isValidating,
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