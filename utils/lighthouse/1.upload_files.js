//npm install -g @lighthouse-web3/sdk@0.2.7

const lighthouse = require('@lighthouse-web3/sdk');


const upload_path = "/Users/peachey.chen/Downloads/download.svg"
const apiKey="025f2373."

console.log("Start uploading");
lighthouse.upload(upload_path, apiKey)
  .then(uploadResponse => {
    console.log("Upload completed:", uploadResponse);
  })
  .catch(error => {
    console.error("Error during upload:", error.message);
  });

// example output:
//   Start uploading
//   Upload completed: {
//     data: {
//       Name: 'download.svg',
//       Hash: 'Qmf1bL4JZdbsFTjHTCWoCo9B1LDATMaamrUDdpHuyUScBM',
//       Size: '59720'
//     }
//   }
