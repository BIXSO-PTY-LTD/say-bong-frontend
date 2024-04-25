import { axiosHost, endpoints } from '#/utils/axios';

export function useUpload() {
  const upload = async (files: File | File[]) => {
    const uploadUrl = endpoints.upload;

    try {
      const formData = new FormData();

      if (Array.isArray(files)) {
        files.forEach((file, index) => {
          formData.append(`file${index + 1}`, file);
        });
      } else {
        formData.append('file1', files);
      }



      const response = await axiosHost.post(uploadUrl, formData);

      const updatedCustomerData = response.data.data;

      return updatedCustomerData;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('file upload failed');
    }
  };

  return upload;
}
