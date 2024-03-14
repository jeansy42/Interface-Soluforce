import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="mt-6 font-bold">
        Alguma coisa foi mal.Por favor contate ao suporte.
      </h2>
      <Link className="btn btn-primary" to={"/"}>
        Voltar á pagina principal
      </Link>
    </div>
  );
}

export default ErrorPage;
