import { useLoaderData, useParams } from "react-router-dom";
import Main from "./Main";
import Navbar from "./Navbar";
import { ResponseInterface } from "../libs/auxiliars";

function ModuleDoorSensor() {
  const { status } = useLoaderData() as unknown as ResponseInterface;
  const { dispositiveId } = useParams();
  return (
    <>
      <Navbar />
      <Main>
        <div className="flex flex-col items-center gap-6">
          <h2> {dispositiveId} </h2>
          <h3>{`Estado da porta ${status == "0" ? "Aberta" : "Fechada"}`}</h3>
        </div>
      </Main>
    </>
  );
}

export default ModuleDoorSensor;
