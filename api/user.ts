import { IUserAccount, IUserItem } from "#/types/user";
import { axiosHost, endpoints, hostFetcher } from "#/utils/axios";
import { useMemo } from "react";
import useSWR from "swr";

export function useGetUsers() {
  const URL = endpoints.user.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      users: (data?.items as IUserItem[]) || [],
      paginate: data?.paginate || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.items.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useUpdateUser() {
  const editUser = async (updatedUserData: Partial<IUserAccount>) => {
    const URL = `${endpoints.user.update}`;

    try {
      await axiosHost.patch(URL, updatedUserData)
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Update  failed');
    }

  }
  return editUser
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

export function useDeleteUser() {
  const deleteUser = async (userId: string) => {
    const URL = `${endpoints.user.delete}/${userId}`;

    try {
      await axiosHost.delete(URL);
      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Deletion failed');
    }
  };

  return deleteUser;
}

export function useGetUser(userId: string) {
  const URL = userId ? `${endpoints.user.details}/${userId}` : '';

  const { data, isLoading, error, isValidating } = useSWR(URL, hostFetcher);

  const memoizedValue = useMemo(
    () => ({
      user: data as IUserItem,
      userLoading: isLoading,
      userError: error,
      userValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue
}




