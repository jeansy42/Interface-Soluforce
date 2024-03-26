import InputErrorMessage from "../../components/InputErrorMessage";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import Main from "../../components/Main";
import { useForm, SubmitHandler } from "react-hook-form";
import Navbar from "../../components/Navbar";
import { sendRedMeshConfig } from "../../libs/network";
import { useState } from "react";

export interface InputsRedMesh {
  ssid: string;
  password: string;
  confirmPassword: string;
  port: number | "";
}
function RedMeshPage() {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const defaultValues = {
    ssid: "",
    password: "",
    confirmPassword: "",
    port: 5555,
  };
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm<InputsRedMesh>({ defaultValues });

  const password = watch("password");
  const ssid = watch("ssid");
  const port = watch("port");
  const onSubmit: SubmitHandler<InputsRedMesh> = async (data) => {
    try {
      const res = await sendRedMeshConfig(data);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setShowModal(false);
    }
  };
  const handleError = () => setShowModal(false);

  return (
    <>
      {showModal && (
        <dialog
          className={`modal modal-bottom sm:modal-middle ${showModal ? "modal-open" : ""}`}
        >
          <div className="modal-box">
            <h3 className="text-lg font-bold">Configuração da Red Mesh</h3>
            <p className="py-4">
              Tem certeza que essas são as configurações da sua red mesh:
            </p>
            <ul>
              <li>{`SSID: ${ssid}`}</li>
              <li className="flex justify-between">
                {`Senha: ${showConfirmPassword ? password : "*********"}`}
                {showConfirmPassword ? (
                  <IoIosEyeOff
                    onClick={() => setShowConfirmPassword(false)}
                    className="h-5 w-5"
                  />
                ) : (
                  <IoIosEye
                    onClick={() => setShowConfirmPassword(true)}
                    className="h-5 w-5"
                  />
                )}
              </li>
              <li>{`Porta: ${port}`}</li>
            </ul>
            <div className="modal-action justify-between">
              <button
                type="submit"
                form="formConfigRedMesh"
                className="btn btn-warning"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="btn btn-primary"
              >
                Fechar
              </button>
            </div>
          </div>
        </dialog>
      )}
      <Navbar />
      <Main>
        <h2 className="mb-4 text-center text-xl font-bold">
          Configurar Red Mesh
        </h2>
        <form
          id="formConfigRedMesh"
          className="form-control m-auto w-4/5 gap-4 md:w-3/5"
          onSubmit={handleSubmit(onSubmit, handleError)}
        >
          <input
            {...register("ssid", {
              required: "Este campo é requerido",
              minLength: {
                value: 5,
                message: "O SSID deve ter um mínimo de 5 caráteres!",
              },
              maxLength: {
                value: 20,
                message: "O SSID deve ter um máximo de até 20 carateres!",
              },
            })}
            className="input input-bordered input-primary"
            type="text"
            placeholder="SSID"
          />
          {errors.ssid?.message && (
            <InputErrorMessage message={errors.ssid.message} />
          )}
          <label className="input input-bordered input-primary flex items-center gap-2">
            <input
              {...register("password", {
                required: "Este campo é requerido",
                minLength: {
                  value: 10,
                  message: "A senha deve ter um mínimo de 10 caráteres!",
                },
                maxLength: {
                  value: 20,
                  message: "A senha deve ter um máximo de até 20 carateres!",
                },
              })}
              className="grow"
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              autoComplete="off"
            />
            {showPassword ? (
              <IoIosEyeOff
                onClick={() => setShowPassword(false)}
                className="h-5 w-5"
              />
            ) : (
              <IoIosEye
                onClick={() => setShowPassword(true)}
                className="h-5 w-5"
              />
            )}
          </label>

          {errors.password?.message && (
            <InputErrorMessage message={errors.password.message} />
          )}
          <input
            {...register("confirmPassword", {
              validate: (e) => e === password || "Não coincide com a senha!",
            })}
            className="input input-bordered input-primary"
            placeholder="Confirmar senha"
            type={showPassword ? "text" : "password"}
            autoComplete="off"
          />
          {errors.confirmPassword?.message && (
            <InputErrorMessage message={errors.confirmPassword.message} />
          )}
          <input
            type="number"
            {...register("port", {
              min: { value: 0, message: "Numero de porta não permitido" },
              max: { value: 65535, message: "Numero de porta não permitido" },
              pattern: {
                value: /^[0-9]+$/,
                message: "A porta deve ser un número!",
              },
            })}
            className="input input-bordered input-primary "
            placeholder="Porta (default : 5555)"
          />

          {errors.port?.message && (
            <InputErrorMessage message={errors.port.message} />
          )}
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary flex gap-2"
            type="button"
          >
            Enviar
          </button>
        </form>
      </Main>
    </>
  );
}

export default RedMeshPage;
