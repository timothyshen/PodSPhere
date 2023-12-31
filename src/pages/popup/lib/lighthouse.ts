import lighthouse from '@lighthouse-web3/sdk';

const apiKey = '025f2373.3c424c6d77904a31bf70b760a05de164';

export async function uploadLighthouse(upload_path: string) {
  console.log('uploading to lighthouse');
  console.log(upload_path);
  const response = await lighthouse
    .uploadText(upload_path, apiKey)
    .then(uploadResponse => {
      console.log('Upload completed:', uploadResponse);
      return uploadResponse.data.Hash;
    })
    .catch(error => {
      console.error('Error during upload:', error.message);
    });

  return response && response;
}

export async function getFileInfo(hash: string) {
  await lighthouse
    .getFileInfo(hash)
    .then(fileInfo => {
      console.log('File info:', fileInfo);
      return fileInfo;
    })
    .catch(error => {
      console.error('Error during getFileInfo:', error.message);
    });
}
