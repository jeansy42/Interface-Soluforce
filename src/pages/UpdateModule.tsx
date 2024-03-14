import { SubmitHandler, useForm } from "react-hook-form";
import InputErrorMessage from "../components/InputErrorMessage";
import Navbar from "../components/Navbar";
import { ModuleInterface, updateModule } from "../libs/auxiliars";
import { InputsInterface, ParamsProps } from "./AddModule";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

function UpdateModule() {
  const module = useLoaderData() as ModuleInterface;
  delete module["id"];
  const navigate = useNavigate();
  const { dispositiveId, moduleId } = useParams() as unknown as ParamsProps;
  const defaultValues = module;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsInterface>({ defaultValues });

  const onSubmit: SubmitHandler<InputsInterface> = async (data) => {
    try {
      const res = await updateModule(data, dispositiveId, moduleId);
      console.log(res);
      navigate("/dispositives", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div>
        <h2 className="mb-4 text-center text-xl font-bold">Atualizar Modulo</h2>
        <form
          className="form-control m-auto w-4/5 gap-4 md:w-3/5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("name", {
              required: "Este campo é requerido",
              minLength: {
                value: 5,
                message: "O nome deve ter um mínimo de 5 caráteres!",
              },
              maxLength: {
                value: 20,
                message: "O nome deve ter um máximo de até 20 carateres!",
              },
            })}
            className="input input-bordered input-primary"
            type="text"
            placeholder="Nome"
          />
          {errors.name?.message && (
            <InputErrorMessage message={errors.name.message} />
          )}
          <textarea
            {...register("description", {
              required: "Este campo é requerido",
              minLength: {
                value: 10,
                message: "A descrição deve ter um mínimo de 10 caráteres!",
              },
              maxLength: {
                value: 100,
                message: "A descrição deve ter um máximo de até 20 carateres!",
              },
            })}
            className="textarea textarea-bordered textarea-primary"
            placeholder="Descrição"
          />
          {errors.description?.message && (
            <InputErrorMessage message={errors.description.message} />
          )}
          <select
            {...register("type", { required: "Este campo é requerido" })}
            className="select select-bordered select-primary"
            name="type"
          >
            <option value={""} selected disabled>
              Tipo
            </option>
            <option value="actioner">Atuador</option>
          </select>
          {errors.type?.message && (
            <InputErrorMessage message={errors.type.message} />
          )}
          <button className="btn btn-primary flex gap-2" type="submit">
            Enviar
            {/* {isLoading && <span className="loading loading-dots loading-sm" />} */}
          </button>
        </form>
      </div>
    </>
  );
}

export default UpdateModule;
