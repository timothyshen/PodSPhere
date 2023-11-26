import { getIrys, getBundlr } from './bundlr';

import { uploadLighthouse } from './lighthouse';

export async function uploadJson(data: unknown, choice: string): Promise<string> {
  const irys = await getIrys();
  const tags = [{ name: 'Content-Type', value: 'application/json', project: 'PodSphere' }];
  const serialized = JSON.stringify(data);
  console.log(serialized);
  if (choice === 'lighthouse') {
    const lighthouse = await uploadLighthouse(serialized);
    console.log(lighthouse);
    return `https://gateway.lighthouse.storage/ipfs/${lighthouse}`;
  }
  if (choice === 'irys') {
    const price = await irys.getPrice(new Blob([serialized]).size);
    await irys.fund(price);

    const receipt = await irys.upload(serialized, { tags });
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    return `https://gateway.irys.xyz/${receipt.id}`;
  }
  if (choice === 'bundlr') {
    const bundlr = await getBundlr();

    const serialized = JSON.stringify(data);
    const tx = await bundlr.upload(serialized, {
      tags: [
        { name: 'Content-Type', value: 'application/json' },
        { name: 'project', value: 'PodSphere' },
      ],
    });

    return `https://arweave.net/${tx.id}`;
  }
}
