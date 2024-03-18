import { useLoaderData, useParams, useRevalidator } from "react-router-dom";
import Navbar from "./Navbar";
import { ResponseInterface, setModuleStatus, sleep } from "../libs/auxiliars";
import { useState } from "react";
import Main from "./Main";

function ModuleActioner() {
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useLoaderData() as unknown as ResponseInterface;
  const { dispositiveId, module } = useParams();
  const revalidator = useRevalidator();
  const obj = { type: module as string, nodeId: dispositiveId as string };
  const handleCLick = async (action: number) => {
    try {
      setIsLoading(true);
      const data = await setModuleStatus({ ...obj, action });
      console.log(data);
      await sleep(1500);
      revalidator.revalidate();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <Main>
        <div className="flex flex-col items-center gap-6">
          <h2>{dispositiveId}</h2>
          {isLoading ? (
            <span className="loading loading-dots loading-md" />
          ) : (
            <h3>{`Estado do atuador : ${status == "0" ? "Desligado" : "Ligado"}`}</h3>
          )}
          <div className="flex gap-2">
            <button
              disabled={isLoading}
              onClick={() => handleCLick(1)}
              className="btn btn-primary font-bold "
            >
              Ligar
            </button>
            <button
              disabled={isLoading}
              onClick={() => handleCLick(0)}
              className="btn btn-warning font-bold "
            >
              Desligar
            </button>
          </div>
        </div>
      </Main>
    </>
  );
}

export default ModuleActioner;
