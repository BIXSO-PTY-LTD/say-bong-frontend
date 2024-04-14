import { IVideoItem } from "#/types/video";
import { axiosHost, endpoints, hostFetcher } from "#/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useGetHighlightVideos(offset?: number, limit?: number) {
  let URL = endpoints.highlightVideo.list;

  if (offset !== undefined && limit !== undefined) {
    URL += `?offset=${offset}&limit=${limit}`;
  }

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      highlightVideos: (data?.data as IVideoItem[]) || [],
      highlightVideosLoading: isLoading,
      paginate: data || [],
      highlightVideosError: error,
      highlightVideosValidating: isValidating,
      highlightVideosEmpty: !isLoading && !data?.data.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export function useCreateHighlightVideo() {
  const createHighlightVideo = async (highlightVideoData: Partial<IVideoItem>) => {
    const URL = endpoints.highlightVideo.create;

    try {
      const response = await axiosHost.post(URL, highlightVideoData);

      return response.data.data;
    } catch (error) {
      console.error('Error creating HighlightVideo:', error);
      throw new Error('Creation failed');
    }
  };

  return createHighlightVideo;
}

export function useGetHighlightVideo(videoId: string | undefined) {
  const URL = videoId ? `${endpoints.highlightVideo.details}/${videoId}` : '';

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