import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ModuleInterface, deleteModule } from "../libs/auxiliars";
import ModuleCard from "../components/ModuleCard";
import { useState } from "react";

export interface ModuleConfigInterface {
  config: ModuleInterface[];
}

function Dispositive() {
  const { config } = useLoaderData() as ModuleConfigInterface;
  const { dispositiveId } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState("");
  const handleClickToDelete = async () => {
    try {
      const data = await deleteModule(dispositiveId as string, moduleToDelete);
      console.log(data);
      setShowModal(false);
      navigate("/dispositives", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {showModal && (
        <dialog className={`modal ${showModal ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="text-lg font-bold">Apagar modulo</h3>
            <p className="py-4">Está seguro que deseja apagar este modulo?</p>
            <div className="modal-action justify-between">
              <button onClick={handleClickToDelete} className="btn btn-warning">
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-primary"
              >
                Fechar
              </button>
            </div>
          </div>
        </dialog>
      )}
      <Navbar />
      <Link className="btn btn-primary" to={`/addModule/${dispositiveId}`}>
        Agregar Modulo
      </Link>
      <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {config.length === 0 ? (
          <span>Não tem modulos ainda.</span>
        ) : (
          config.map((module) => (
            <ModuleCard
              setModuleToDelete={setModuleToDelete}
              setState={setShowModal}
              module={module}
              moduleToDelete={moduleToDelete}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Dispositive;
