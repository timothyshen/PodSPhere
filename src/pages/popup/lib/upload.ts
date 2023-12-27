import { getIrys } from './irys';
export async function uploadJson(data: unknown, choice: string): Promise<string> {
  const tags = [
    { name: 'Content-Type', value: 'application/json' },
    { name: 'project', value: 'podSphere' },
  ];
  const serialized = JSON.stringify(data);
  console.log(serialized);
  const irys = await getIrys();
  const receipt = await irys.upload(serialized, { tags });
  console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
  return receipt.id;
}
