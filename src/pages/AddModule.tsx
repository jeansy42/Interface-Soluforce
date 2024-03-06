import { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sendNewModule } from "../libs/auxiliars";
import Navbar from "../components/Navbar";

function AddModule() {
  const navigate = useNavigate();
  const { dispositiveId } = useParams();
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      type: formData.get("type") as string,
    };
    try {
      sendNewModule(data, dispositiveId as string);
      navigate(`/dispositives/${dispositiveId}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div>
        <h2 className="mb-4 text-center text-xl font-bold">Anhadir Modulo</h2>
        <form
          className="form-control m-auto w-4/5 gap-4 md:w-3/5"
          onSubmit={(e) => onSubmit(e)}
        >
          <input
            required
            className="input input-bordered input-primary"
            name="name"
            type="text"
            placeholder="Nome"
          />
          <textarea
            required
            className="textarea textarea-bordered textarea-primary"
            name="description"
            placeholder="Descrição"
          />
          <select
            required
            className="select select-bordered select-primary"
            name="type"
          >
            <option selected disabled>
              Tipo
            </option>
            <option value="sensor">Sensor</option>
            <option value="actioner">Atuador</option>
            <option value="buzzer">Buzzer</option>
            <option value="pwm">PWM</option>
          </select>
          <button className="btn btn-primary flex gap-2" type="submit">
            Enviar
            {/* {isPending && <span className="loading loading-dots loading-sm" />} */}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddModule;
