import { Link } from "react-router-dom";
import Main from "../components/Main";

function ErrorPage() {
  return (
    <Main>
      <div className="flex flex-col gap-6">
        <h2 className="mt-6 text-center font-bold">
          Alguma coisa foi mal.Por favor contate ao suporte.
        </h2>
        <Link className="btn btn-primary" to={"/"}>
          Voltar á pagina principal
        </Link>
      </div>
    </Main>
  );
}

export default ErrorPage;
