const lighthouse = require('@lighthouse-web3/sdk');

const hash="Qmf1bL4JZdbsFTjHTCWoCo9B1LDATMaamrUDdpHuyUScBM"

// const response = lighthouse.getFileInfo(cid)

// console.log(response)

const runAsyncCode = async () => {
    try {
      console.log("Start operation");
      const result = await lighthouse.getFileInfo(hash);
      console.log(result);
      console.log("Operation completed");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

// const result = await lighthouse.getFileInfo(cid);
// console.log(result)
runAsyncCode()

// Start operation
// {
//   data: {
//     fileSizeInBytes: '4942',
//     cid: 'QmYWNRW9D1QGEUcxYq7q4SQKX6nGq7fiHKjkc3giX61efQ',
//     encryption: false,
//     fileName: 'download.png',
//     mimeType: 'image/png',
//     txHash: ''
//   }
// }
// Operation completed