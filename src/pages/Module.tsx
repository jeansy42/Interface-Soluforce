import { useParams } from "react-router-dom";
import ModuleSensor from "../components/ModuleSensor";
import ModuleActioner from "../components/ModuleActioner";

function Module() {
  const { dispositiveId, module } = useParams();
  if (module === "sensor")
    return <ModuleSensor dispositiveId={dispositiveId as string} />;
  else if (module === "actioner")
    return <ModuleActioner dispositiveId={dispositiveId as string} />;
}

export default Module;
