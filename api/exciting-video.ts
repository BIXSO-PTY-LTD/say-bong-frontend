import { IVideoItem } from "#/types/video";
import { axiosHost, endpoints, hostFetcher } from "#/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useGetExcitingVideos(offset?: number, limit?: number) {
  let URL = endpoints.excitingVideo.list;

  if (offset !== undefined && limit !== undefined) {
    URL += `?offset=${offset}&limit=${limit}`;
  }

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      excitingVideos: (data?.data as IVideoItem[]) || [],
      excitingVideosLoading: isLoading,
      paginate: data || [],
      excitingVideosError: error,
      excitingVideosValidating: isValidating,
      excitingVideosEmpty: !isLoading && !data?.data.length,
      endpoints: URL
    }),
    [URL, data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useCreateExcitingVideo() {
  const createExcitingVideo = async (excitingVideoData: Partial<IVideoItem>) => {
    const URL = endpoints.excitingVideo.create;

    try {
      const response = await axiosHost.post(URL, excitingVideoData);

      return response.data.data;
    } catch (error) {
      console.error('Error creating ExcitingVideo:', error);
      throw new Error('Creation failed');
    }
  };

  return createExcitingVideo;
}

export function useGetExcitingVideo(videoId: string | undefined) {
  const URL = videoId ? `${endpoints.excitingVideo.details}/${videoId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      video: data as IVideoItem,
      videoLoading: isLoading,
      videoError: error,
      videoValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue
}
export function useUpdateExcitingVideo() {
  const updateExcitingVideo = async (updatedExcitingVideoData: Partial<IVideoItem>) => {
    const URL = `${endpoints.excitingVideo.update}`;
    try {
      await axiosHost.put(URL, updatedExcitingVideoData)
    } catch (error) {
      console.error('Error updating ExcitingVideo:', error);
      throw new Error('Update  failed');
    }

  }
  return updateExcitingVideo
}


export function useDeleteExcitingVideo() {
  const deleteExcitingVideo = async (excitingVideoId: string) => {
    const URL = `${endpoints.excitingVideo.list}/${excitingVideoId}`;

    try {
      await axiosHost.delete(URL);
      return true;
    } catch (error) {
      console.error('Error deleting ExcitingVideo:', error);
      throw new Error('Deletion failed');
    }
  };

  return deleteExcitingVideo;
}