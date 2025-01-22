import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { PiUserCircleLight } from "react-icons/pi";
import { handleLogin } from "@/pages/api/services/globalAuth";
import { useUser } from "@/context/UserContext";
import { useAccount } from "@/context/AccountContext";

export default function LoginPage() {
  const { setAccount } = useAccount();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      await handleLogin(data.email, data.password, setUser, setAccount);
      router.push("/");
    } catch (error) {
      if (error.message === "Invalid credentials") {
        setError("root.data", {
          type: "manual",
          message: "Ups! Verifica que tus datos sean los correctos",
        });
      } else {
        setError("root.data", {
          type: "manual",
          message: "Ups! Hubo un error al iniciar sesión, intentelo mas tarde",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <div className="h-screen bg-white">
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-96 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 items-center mb-12"
            >
              <PiUserCircleLight className="text-8xl text-congress-950" />
              <h2 className=" text-congress-950 text-2xl">Bienvenido</h2>
              <div className="flex flex-col gap-1 w-full">
                <p className="w-full text-left text-congress-950">Email</p>
                <input
                  type="text"
                  placeholder="Ingresa tu email"
                  autoComplete="off"
                  className={clsx(
                    "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                    {
                      "bg-red-500/10 border-red-500": errors.email,
                    }
                  )}
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email es requerido",
                    },
                    pattern: {
                      value: /[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+/,
                      message: "Ingresa un email valido",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p className="w-full text-left text-congress-950">Contraseña</p>
                <input
                  type="password"
                  className={clsx(
                    "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                    {
                      "bg-red-500/10 border-red-500": errors.password,
                    }
                  )}
                  placeholder="Ingresa tu contraseña"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "La contraseña es requerida",
                    },
                  })}
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex flex-row justify-between py-2 w-full">
                <div className="flex flex-row gap-2"></div>
                <a href="" className="text-congress-950">
                  Olvidaste tu contraseña?
                </a>
              </div>
              <button
                className={clsx(
                  "w-full rounded-md bg-congress-900 hover:bg-congress-700 p-2 text-white",
                  {
                    "bg-gray-300": isSubmitting,
                  }
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Cargando ..." : "Iniciar sesión"}
              </button>
              {errors.root?.data && (
                <span className="p-2 rounded w-full bg-red-500/15 text-sm text-red-500">
                  {errors.root.data.message}
                </span>
              )}
            </form>

            <hr />
            <p className="text-congress-950 mt-4 text-center">
              No tienes una cuenta?{" "}
              <a className="text-congress-300" href="/create-account">
                Registrate aquí
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
