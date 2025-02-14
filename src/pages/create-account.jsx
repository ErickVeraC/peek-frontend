import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { toast } from "sonner";
import { createUser } from "@/pages/api/services/users/User";
import { createVet } from "@/pages/api/services/vets/Vet";
import { createOwner } from "@/pages/api/services/owners/Owner";
import clsx from "clsx";

import PrimaryButton from "@/components/PrimaryButton";
import { MdOutlinePersonAddAlt } from "react-icons/md";

export default function Login() {
  const router = useRouter();
  const [isVet, setIsvet] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  function handleCheckbox() {
    setIsvet(!isVet);
  }

  function handleAcceptTerms() {
    setAcceptTerms((prev) => !prev);
  }

  async function onSubmit(data) {
    let role = 0;
    isVet ? (role = 0) : (role = 1);
    alert(role);
    try {
      setIsSubmitting(true);
      const user = await createUser({
        name: data.name,
        lastName: data.lastname,
        email: data.email,
        password: data.password,
        role: role,
      });

      if (user) {
        const userId = user.data.user;
        if (isVet) {
          const vet = await createVet({
            professionalId: data.professionalId,
            raiting: 0,
            user: userId,
          });
        } else {
          const owner = await createOwner({
            raiting: 0,
            user: userId,
          });
        }
        toast.success("Cuenta creada con éxito!");
        router.push("/login");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error("Error al crear cuenta:", error.message || error);
      toast.error(
        `Error al crear cuenta: ${error.message || "Error desconocido"}`
      );
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-white  h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="bg-white p-6 rounded-lg shadow-2xl w-96 md:w-[450px] ">
          <h2 className="text-congress-950 text-2xl text-center mb-4">
            Crea una cuenta
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full grid grid-flow-row grid-cols-2 gap-5 mt-4"
          >
            <div>
              <label className="w-full text-left text-congress-950">
                Nombre
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Ingresa tu nombre",
                  },
                })}
                type="text"
                className={clsx(
                  "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                  {
                    "bg-red-500/10 border-red-500": errors.name,
                  }
                )}
              ></input>
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div>
              <label className="w-full text-left text-congress-950">
                Apellido
              </label>
              <input
                {...register("lastname", {
                  required: {
                    value: true,
                    message: "Ingresa tu apellido",
                  },
                })}
                type="text"
                className={clsx(
                  "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                  {
                    "bg-red-500/10 border-red-500": errors.lastname,
                  }
                )}
              ></input>
              {errors.lastname && (
                <span className="text-red-500">{errors.lastname.message}</span>
              )}
            </div>

            <div className="col-span-2">
              <label className="w-full text-left text-congress-950">
                Email
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Ingresa tu correo electrónico",
                  },
                })}
                type="text"
                className={clsx(
                  "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                  {
                    "bg-red-500/10 border-red-500": errors.email,
                  }
                )}
              ></input>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="relative flex flex-col">
              <label className="w-full text-left text-congress-950">
                Contraseña
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Ingresa una contraseña",
                  },
                })}
                className={clsx(
                  "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                  {
                    "bg-red-500/10 border-red-500": errors.password,
                  }
                )}
                type={showPassword ? "text" : "password"}
              />
              <button
                className="absolute right-2 top-9"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-icons text-gray-300">
                  {showPassword ? "svisibility" : "visibility_off"}
                </span>
              </button>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div className="relative flex flex-col">
              <label className="w-full text-left text-congress-950">
                Confirmar contraseña
              </label>
              <input
                {...register("passwordvalidate", {
                  required: {
                    value: true,
                    message: "Confirmar contraseña",
                  },
                  validate: (value) =>
                    value === password || "La contraseña no coincide",
                })}
                className={clsx(
                  "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                  {
                    "bg-red-500/10 border-red-500": errors.passwordvalidate,
                  }
                )}
                type={showConfirmPassword ? "text" : "password"}
              />
              <button
                className="absolute right-2 top-9"
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <span className="material-icons text-gray-300">
                  {showConfirmPassword ? "visibility" : "visibility_off"}
                </span>
              </button>
              {errors.passwordvalidate && (
                <span className="text-red-500">
                  {errors.passwordvalidate.message}
                </span>
              )}
            </div>

            <label className="w-full text-left text-congress-950 flex items-center col-span-2">
              <span className="material-icons mr-2">
                {isVet ? "check_box" : "check_box_outline_blank"}
              </span>
              <input
                type="checkbox"
                checked={isVet}
                onChange={handleCheckbox}
                style={{ display: "none" }}
              />
              ¿Eres veterinario?
            </label>

            {isVet && (
              <div className="col-span-2">
                <label className="w-full text-left text-congress-950">
                  Registra tu Cédula profesional
                </label>
                <input
                  {...register("professionalId", {
                    required: {
                      value: true,
                      message: "Es ogligatorio ingresar tu cédula profesional",
                    },
                  })}
                  placeholder="4046892"
                  className={clsx(
                    "w-full rounded-md border border-gray-200 p-2 text-congress-950 mt-3",
                    {
                      "bg-red-500/10 border-red-500": errors.professionalId,
                    }
                  )}
                  type="text"
                />
                {errors.professionalId && (
                  <span className="text-red-500">
                    {" "}
                    {errors.professionalId.message}
                  </span>
                )}
              </div>
            )}

            <label className="w-full text-left text-congress-950 flex items-center col-span-2">
              <span className="material-icons mr-2">
                {acceptTerms ? "check_box" : "check_box_outline_blank"}
              </span>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={handleAcceptTerms}
                style={{ display: "none" }}
                {...register("terms", {
                  required: {
                    value: true,
                    message: "Acepta los términos y condiciones",
                  },
                  onChange: () => handleAcceptTerms(),
                })}
              />
              Acepto los términos y condiciones
            </label>
            {errors.terms && (
              <span className="text-red-500 col-span-2">
                {errors.terms.message}
              </span>
            )}
            <div className="col-span-2">
              <PrimaryButton label="Crear cuenta" isSubmitting={isSubmitting} />
            </div>
            <div className="material-icons relative pt-[25px] h-[40px] col-span-2">
              <>
                <hr className="w-2/3 mx-auto text-[#D1D5DC]"></hr>
                <span className="absolute top-[13px] mx-auto left-[8px] text-[#D1D5DC] right-0 text-center bg-white w-[35px]">
                  {"motion_photos_on"}
                </span>
              </>
            </div>
            <p className="w-full text-congress-950 text-center col-span-2">
              ¿Ya tienes una cuenta?{" "}
              <Link className="text-congress-300" href="/login">
                Inicia Sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
