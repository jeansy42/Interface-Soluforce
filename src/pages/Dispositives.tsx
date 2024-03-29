import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";
import Main from "../components/Main";

function Dispositives() {
  const dispositives = useLoaderData() as string[];
  return (
    <>
      <Navbar />
      <Main>
        <h1>Lista de dispositivos</h1>
        <ul className="m-auto flex w-3/5 flex-col md:w-20">
          {dispositives.map((dispositive) => (
            <li className="btn btn-primary" key={dispositive}>
              <Link to={`/dispositives/${dispositive}`}>{dispositive}</Link>
            </li>
          ))}
        </ul>
      </Main>
    </>
  );
}

export default Dispositives;
