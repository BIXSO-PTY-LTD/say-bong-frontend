import { IUserAccount, IUserItem } from "#/types/user";
import { axiosHost, endpoints, hostFetcher } from "#/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useGetUsers(offset: number) {
  const URL = `${endpoints.user.list}?offset=${offset}&limit=8`;

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      users: (data?.data as IUserItem[]) || [],
      paginate: data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}


export function useChangePassword() {
  const changePassword = async (phoneOrUserName: string, password: string, confirmPassword: string) => {
    const URL = endpoints.auth.changePassword;

    const data = {
      phoneOrUserName,
      password,
      confirmPassword
    };

    try {
      await axiosHost.post(URL, data);
    } catch (error) {
      console.error('Error changing password:', error);
      throw new Error('Password change failed');
    }
  };

  return changePassword;
}







