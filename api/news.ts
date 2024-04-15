import { INewsItem } from "#/types/news";
import { axiosHost, endpoints, hostFetcher } from "#/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useGetNews(offset?: number, limit?: number) {
  let URL = endpoints.news.list;

  if (offset !== undefined && limit !== undefined) {
    URL += `?offset=${offset}&limit=${limit}`;
  }

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      news: (data?.data as INewsItem[]) || [],
      newsLoading: isLoading,
      paginate: data || [],
      newsError: error,
      newsValidating: isValidating,
      newsEmpty: !isLoading && !data?.data.length,
      endpoints: URL
    }),
    [URL, data, error, isLoading, isValidating]
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

export function useUpdateNew() {
  const updateNew = async (updatedNewData: Partial<INewsItem>) => {
    const URL = `${endpoints.news.update}`;
    try {
      await axiosHost.put(URL, updatedNewData)
    } catch (error) {
      console.error('Error updating New:', error);
      throw new Error('Update  failed');
    }

  }
  return updateNew
}
export function useGetNew(newId: string | undefined) {
  const URL = newId ? `${endpoints.news.details}/${newId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      new: data as INewsItem,
      newLoading: isLoading,
      newError: error,
      newValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue
}

export function useDeleteNew() {
  const deleteNew = async (newId: string) => {
    const URL = `${endpoints.news.delete}/${newId}`;

    try {
      await axiosHost.delete(URL);
      return true;
    } catch (error) {
      console.error('Error deleting New:', error);
      throw new Error('Deletion failed');
    }
  };

  return deleteNew;
}