export interface ModuleInterface {
  id?: string;
  name: string;
  description: string;
  type: string;
}

export async function getDispositives(): Promise<string[]> {
  const res = await fetch("/getDispositives");
  const data: string[] = await res.json();
  return data;
}
export async function getDispositiveInfo(nodeID: string | undefined) {
  if (nodeID) {
    const res = await fetch(`/getDispositiveInfo/${nodeID}`);
    const data = await res.json();
    console.log(data);
    return data;
  }
}

export async function sendNewModule(
  newModule: ModuleInterface,
  nodeId: string,
) {
  const res = await fetch(`/addModule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...newModule, nodeId }),
  });
  const data = await res.json();
  console.log(data);
}
