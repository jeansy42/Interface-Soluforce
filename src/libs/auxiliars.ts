export interface ModuleInterface {
  id?: string;
  name: string;
  description: string;
  type: string;
}
export interface ResponseInterface {
  status: string;
  msg: string;
}
export interface setModuleStatusInterface {
  nodeId: string;
  type: string;
  action: number;
}
export const sleep = async (time: number) => {
  return new Promise((r) => setTimeout(r, time));
};

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
): Promise<ResponseInterface> {
  const res = await fetch(`/addModule`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...newModule, nodeId }),
  });
  const data: ResponseInterface = await res.json();
  console.log(data);
  return data;
}

export async function updateModule(
  moduleToUpdate: ModuleInterface,
  nodeId: string,
  moduleId: string,
): Promise<ResponseInterface> {
  const res = await fetch(`/addModule?moduleId=${moduleId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...moduleToUpdate, nodeId }),
  });
  const data: ResponseInterface = await res.json();
  console.log(data);
  return data;
}

export async function getModuleFromDispositiveById(
  nodeId: string,
  moduleId: string,
): Promise<ModuleInterface | ResponseInterface> {
  const res = await fetch(
    `/getModuleFromDispositiveById?nodeId=${nodeId}&moduleId=${moduleId}`,
  );
  const data: ModuleInterface | ResponseInterface = await res.json();
  return data;
}

export async function deleteModule(
  nodeId: string,
  moduleId: string,
): Promise<ResponseInterface> {
  const res = await fetch(
    `/deleteModule?nodeId=${nodeId}&moduleId=${moduleId}`,
    {
      method: "DELETE",
    },
  );
  const data: ResponseInterface = await res.json();
  return data;
}

export async function getModuleInfo(
  dispositiveId: string,
  module: string,
): Promise<ResponseInterface> {
  const res = await fetch(`/getModuleInfo/${dispositiveId}/${module}`);
  const data: ResponseInterface = await res.json();
  console.log(data);
  return data;
}

export async function setModuleStatus(obj: setModuleStatusInterface) {
  const res = await fetch("/setModuleStatus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  return data;
}
