import Navbar from "./Navbar";

function ModuleActioner({ dispositiveId }: { dispositiveId: string }) {
  return (
    <>
      <Navbar />
      <div>
        <h2>{dispositiveId}</h2>
        <h3>Estado da luz:</h3>
        <button>Ligar/Desligar</button>
      </div>
    </>
  );
}

export default ModuleActioner;
