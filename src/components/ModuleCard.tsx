import { ModuleInterface } from "../libs/auxiliars";

function ModuleCard({
  module: { description, name, type },
}: {
  module: ModuleInterface;
}) {
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3>Tipo: {type}</h3>
        <p>{description}</p>
        <div className="card-actions gap-3">
          <button className="btn btn-primary btn-sm">Editar</button>
          <button className="btn btn-primary btn-sm">Apagar</button>
        </div>
      </div>
    </div>
  );
}

export default ModuleCard;
