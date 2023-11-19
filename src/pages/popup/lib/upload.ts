import { getIrys } from './bundlr';

import { uploadLighthouse } from './lighthouse';

export async function uploadJson(data: unknown, choice: string): Promise<string> {
  const irys = await getIrys();
  const tags = [{ name: 'application-id', value: 'leefeifei', project: 'PodSphere' }];
  const serialized = JSON.stringify(data);
  console.log(serialized);
  if (choice === 'lighthouse') {
    const lighthouse = await uploadLighthouse(serialized);
    console.log(lighthouse);
    return `https://gateway.lighthouse.storage/ipfs/${lighthouse}`;
  }
  if (choice === 'irys') {
    const receipt = await irys.upload(serialized, { tags });
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    return `https://gateway.irys.xyz/${receipt.id}`;
  }
}
