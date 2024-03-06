import { Link, useLoaderData, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ModuleInterface } from "../libs/auxiliars";
import ModuleCard from "../components/ModuleCard";

function Dispositive() {
  const dispositiveInfo = useLoaderData() as ModuleInterface[];
  const { dispositiveId } = useParams();
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {dispositiveInfo.length === 0 ? (
          <span>Não tem modulos ainda.</span>
        ) : (
          dispositiveInfo.map((module) => (
            <Link
              key={module.id}
              to={`/dispositives/${dispositiveId}/${module.type}`}
            >
              <ModuleCard module={module} />
            </Link>
          ))
        )}
        <Link className="btn btn-primary" to={`/addModule/${dispositiveId}`}>
          Anhadir Modulo
        </Link>
      </div>
    </>
  );
}

export default Dispositive;
