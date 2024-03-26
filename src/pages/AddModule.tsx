import { useNavigate, useParams } from "react-router-dom";
import { sendNewModule } from "../libs/auxiliars";
import Navbar from "../components/Navbar";
import { useForm, SubmitHandler } from "react-hook-form";
import InputErrorMessage from "../components/InputErrorMessage";
import Main from "../components/Main";

export interface InputsInterface {
  name: string;
  description: string;
  type: string;
}
export interface ParamsProps {
  dispositiveId: string;
  moduleId: string;
}

function AddModule() {
  const navigate = useNavigate();
  const { dispositiveId } = useParams() as unknown as ParamsProps;
  const defaultValues = { name: "", description: "", type: "" };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsInterface>({ defaultValues });

  const onSubmit: SubmitHandler<InputsInterface> = async (data) => {
    try {
      const res = await sendNewModule(data, dispositiveId as string);
      console.log(res);
      navigate("/dispositives", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <Main>
        <h2 className="mb-4 text-center text-xl font-bold">Agregar Modulo</h2>
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
            <option value="doorSensor">Sensor de Porta</option>
          </select>
          {errors.type?.message && (
            <InputErrorMessage message={errors.type.message} />
          )}
          <button className="btn btn-primary flex gap-2" type="submit">
            Enviar
          </button>
        </form>
      </Main>
    </>
  );
}

export default AddModule;
