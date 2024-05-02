export const extractBase64Src = (content: string) => {
  const imgSrcRegex = /data:image\/(?:png|jpeg|jpg|gif);base64,([^'"]+)/g;
  const base64SrcArray = [];
  let match;

  while ((match = imgSrcRegex.exec(content)) !== null) {
    base64SrcArray.push(match[0]); // Pushing the whole match
  }

  return base64SrcArray;
};

export function base64ToFiles(base64Array: string[]) {
  const filesArray = [];

  for (let i = 0; i < base64Array.length; i++) {
    const base64String = base64Array[i];
    const base64Data = base64String.split(',')[1]; // Remove prefix
    const binaryData = atob(base64Data); // Decode base64 string to binary
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let j = 0; j < binaryData.length; j++) {
      uint8Array[j] = binaryData.charCodeAt(j); // Convert to UTF-16 code units
    }

    const blob = new Blob([uint8Array]); // Create blob from binary data
    const file = new File([blob], `file${i}.png`, { type: 'image/png' }); // Create File object

    filesArray.push(file);
  }

  return filesArray;
}
