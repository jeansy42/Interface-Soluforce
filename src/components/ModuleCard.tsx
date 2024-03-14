import { useNavigate, useParams } from "react-router-dom";
import { ModuleInterface } from "../libs/auxiliars";

function ModuleCard({
  module: { description, name, type, id },
  setState,
  setModuleToDelete,
  moduleToDelete,
}: {
  module: ModuleInterface;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setModuleToDelete: React.Dispatch<React.SetStateAction<string>>;
  moduleToDelete: string;
}) {
  const { dispositiveId } = useParams();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/dispositives/${dispositiveId}/${type}`)}
      className="card w-72 bg-base-100 shadow-xl"
    >
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3>Tipo: {type}</h3>
        <p>{description}</p>
        <div className="card-actions gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/updateModule/${dispositiveId}/${id}`);
            }}
            className="btn btn-primary btn-sm"
          >
            Editar
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setModuleToDelete(id as string);
              setState(true);
              console.log(moduleToDelete);
            }}
            className="btn btn-error btn-sm"
          >
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModuleCard;
