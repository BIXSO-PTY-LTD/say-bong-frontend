import { useMemo } from 'react';
import keyBy from 'lodash/keyBy';
import useSWR, { mutate } from 'swr';

import { axiosHost, hostFetcher, endpoints } from '#/utils/axios';
import { ICommentItem } from '#/types/chat';






// ----------------------------------------------------------------------

export function useGetLivestreamComments(liveStreamId: string | undefined) {

  const URL = `${endpoints.livestream}/${liveStreamId}/comment`;

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      comments: (data as ICommentItem[]) || [],
      commentsLoading: isLoading,
      commentsError: error,
      commentsValidating: isValidating,
      commentsEmpty: !isLoading && !data?.length,
      endpoint: URL
    }),
    [URL, data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useSendMessage() {
  const sendMessenger = async (messageData: {
    content: string;
    postId: string | undefined;
    userId: string | undefined;
  }) => {
    const URL = `${endpoints.livestream}/comment`;

    try {
      const response = await axiosHost.post(URL, messageData);

      return response.data.data;
    } catch (error) {
      console.error('Error creating HighlightVideo:', error);
      throw new Error('Creation failed');
    }
  };

  return sendMessenger;
}
