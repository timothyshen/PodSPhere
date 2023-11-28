import { getWebIrys } from './bundlr';

import { uploadLighthouse } from './lighthouse';

export async function uploadJson(data: unknown, choice: string): Promise<string> {
  const tags = [
    { name: 'Content-Type', value: 'application/json' },
    { name: 'project', value: 'podSphere' },
  ];
  const serialized = JSON.stringify(data);
  console.log(serialized);
  if (choice === 'lighthouse') {
    const lighthouse = await uploadLighthouse(serialized);
    console.log(lighthouse);
    return `https://gateway.lighthouse.storage/ipfs/${lighthouse}`;
  }
  if (choice === 'irys') {
    const irys = await getWebIrys();
    const serialized = JSON.stringify(data);
    const receipt = await irys.upload(serialized, { tags });
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    return `https://arweave.net/${receipt.id}`;
  }
}
