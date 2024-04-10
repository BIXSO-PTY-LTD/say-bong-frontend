import { INewsItem } from "#/types/news";
import { axiosHost, endpoints, hostFetcher } from "#/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useGetNews() {
  const URL = endpoints.news.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      news: (data?.data as INewsItem[]) || [],
      newsLoading: isLoading,
      newsError: error,
      newsValidating: isValidating,
      newsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useCreateNews() {
  const createNews = async (newsData: Partial<INewsItem>) => {
    const URL = endpoints.news.create;

    try {
      const response = await axiosHost.post(URL, newsData);

      return response.data.data;
    } catch (error) {
      console.error('Error creating News:', error);
      throw new Error('Creation failed');
    }
  };

  return createNews;
}