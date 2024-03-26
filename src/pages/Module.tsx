import { useParams } from "react-router-dom";
import ModuleActioner from "../components/ModuleActioner";
import ModuleDoorSensor from "../components/ModuleDoorSensor";

function Module() {
  const { module } = useParams();
  if (module === "doorSensor") return <ModuleDoorSensor />;
  else if (module === "actioner") return <ModuleActioner />;
}

export default Module;
