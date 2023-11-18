import { getIrys } from './bundlr';

import { uploadLighthouse } from './lighthouse';

export async function uploadJson(data: unknown, choice: string): Promise<string> {
  const irys = await getIrys();
  const tags = [{ name: 'application-id', value: 'leefeifei', project: 'PodSphere' }];
  const serialized = JSON.stringify(data);
  if (choice === 'lighthouse') {
    const lighthouse = uploadLighthouse(serialized);
    return lighthouse;
  }
  if (choice === 'irys') {
    const receipt = await irys.upload(serialized, { tags });
    console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    return receipt.id;
  }
}
