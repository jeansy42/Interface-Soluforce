import { InputsRedMesh } from "../pages/Network/RedMeshPage";
import { ResponseInterface } from "./auxiliars";

export const sendRedMeshConfig = async (
  config: InputsRedMesh,
): Promise<ResponseInterface> => {
  const { ssid, password, port } = config;
  const okport = port === "" ? 5555 : port;
  const res = await fetch("/redMeshConfig", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ssid, password, port: okport }),
  });
  const data: ResponseInterface = await res.json();
  return data;
};
