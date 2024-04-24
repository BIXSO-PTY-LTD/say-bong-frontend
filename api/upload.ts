import { axiosHost, endpoints } from '#/utils/axios';

export function useUpload() {
  const upload = async (file: File) => {
    const uploadUrl = endpoints.upload;

    try {
      const formData = new FormData();
      formData.append('file1', file);

      const response = await axiosHost.post(uploadUrl, formData);
      console.log(response);

      const updatedCustomerData = response.data;

      return updatedCustomerData;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('file upload failed');
    }
  };

  return upload;
}