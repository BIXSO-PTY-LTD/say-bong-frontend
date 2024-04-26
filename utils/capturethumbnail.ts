const captureThumbnailFromCloudinary = (videoUrl: string, callback: (thumbnailUrl: string) => void) => {
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous'; // Set crossOrigin to 'anonymous' to ensure access to the video
  video.src = videoUrl;
  video.preload = 'metadata';
  video.onloadeddata = () => {
    video.currentTime = 2; // Set the time to 2 seconds
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const thumbnailUrl = canvas.toDataURL();
      callback(thumbnailUrl);
    };
    video.currentTime = 2; // Seeking may not be immediate, so set it again
  };
};
export default captureThumbnailFromCloudinary;