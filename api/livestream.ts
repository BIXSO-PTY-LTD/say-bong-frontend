import { ILivestreamItem } from "#/types/livestream";
import { axiosHost, endpoints, hostFetcher } from "#/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useGetLivestreams(offset?: number, limit?: number) {
  let URL = endpoints.livestream;

  if (offset !== undefined && limit !== undefined) {
    URL += `?offset=${offset}&limit=${limit}`;
  }

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      livestreams: (data?.data as ILivestreamItem[]) || [],
      livestreamsLoading: isLoading,
      paginate: data || [],
      livestreamsError: error,
      livestreamsValidating: isValidating,
      livestreamsEmpty: !isLoading && !data?.data.length,
      endpoints: URL
    }),
    [URL, data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useCreateLivestream() {
  const createLivestream = async (livestreamData: Partial<ILivestreamItem>) => {
    const URL = endpoints.livestream;

    try {
      const response = await axiosHost.post(URL, livestreamData);

      return response.data.data;
    } catch (error) {
      console.error('Error creating Livestream:', error);
      throw new Error('Creation failed');
    }
  };

  return createLivestream;
}

export function useUpdateLivestream() {
  const updateLivestream = async (updatedLivestreamData: Partial<ILivestreamItem>) => {
    const URL = `${endpoints.livestream}`;
    try {
      await axiosHost.put(URL, updatedLivestreamData)
    } catch (error) {
      console.error('Error updating New:', error);
      throw new Error('Update  failed');
    }

  }
  return updateLivestream
}
export function useGetLivestream(livestreamId: string | undefined) {
  const URL = livestreamId ? `${endpoints.livestream}/${livestreamId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      livestream: data as ILivestreamItem,
      livestreamLoading: isLoading,
      livestreamError: error,
      livestreamValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue
}

export function useDeleteLivestream() {
  const deleteLivestream = async (livestreamId: string) => {
    const URL = `${endpoints.livestream}/${livestreamId}`;

    try {
      await axiosHost.delete(URL);
      return true;
    } catch (error) {
      console.error('Error deleting Livestream:', error);
      throw new Error('Deletion failed');
    }
  };

  return deleteLivestream;
}