export const cloudinaryUpload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');
    const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

export const uploadFilesToCloudinary = async (filesArray: File[]) => {
  const uploadedUrls = await Promise.all(filesArray.map(cloudinaryUpload));
  return uploadedUrls;
};
