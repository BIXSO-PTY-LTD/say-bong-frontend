import { useMemo } from 'react';
import keyBy from 'lodash/keyBy';
import useSWR, { mutate } from 'swr';

import { axiosHost, hostFetcher, endpoints } from '#/utils/axios';
import { ICommentItem } from '#/types/chat';






// ----------------------------------------------------------------------

export function useGetLivestreamComments(liveStreamId: string | undefined) {

  const URL = `${endpoints.livestream.base}/${liveStreamId}/comment`;

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      comments: (data?.data as ICommentItem[]) || [],
      commentsLoading: isLoading,
      commentsError: error,
      commentsValidating: isValidating,
      commentsEmpty: !isLoading && !data?.data.length,
      endpoint: URL
    }),
    [URL, data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

