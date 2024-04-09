import { IUserAccount } from "#/types/user";
import { axiosHost, endpoints } from "#/utils/axios";

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





