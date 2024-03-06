import Navbar from "./Navbar";

function ModuleSensor({ dispositiveId }: { dispositiveId: string }) {
  return (
    <>
      <Navbar />
      <div>
        <h2> {dispositiveId} </h2>
        <h3>Informação do sensor</h3>
      </div>
    </>
  );
}

export default ModuleSensor;
