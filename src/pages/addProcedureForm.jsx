import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createVaccine } from "@/pages/api/services/petsFile/vaccinesService";
import * as yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import PrimaryButton from "@/components/PrimaryButton";
import { createProcedure } from "./api/services/petsFile/proceduresService";

const schema = yup.object().shape({
  reason: yup
    .string()
    .required("Razón o motivo requerido")
    .min(2, "Name must be at least 2 characters"),
  diagnosis: yup.string().required("Diagnostico requerido"),
  prescription: yup
    .string()
    .required("Receta o indicaciónes post procedimiento requeridas."),
});

export default function AddProcedureForm({ petId, onClose, onVaccineAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    data.petId = petId;
    data.vetId = localStorage.getItem("access-id");

    setLoading(true);
    try {
      await createProcedure(data);
      toast.success("Procedimiento clinico registrado con éxito");
      onClose();
    } catch (error) {
      toast.error(`Error creando el procedimiento: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className={clsx(
        "fixed align-middle z-40 inset-0 flex items-center justify-center bg-black bg-opacity-50 ml-20"
      )}
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl max-w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-congress-600"
        >
          <MdClose size={24} />
        </button>
        <h2 className="text-congress-950 text-2xl text-center mb-4">
          Agrega un procedimiento clinico
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Razón
            </label>
            <input
              {...register("reason")}
              className={clsx(
                "w-full rounded-md border border-gray-200 p-2 text-congress-950 mt-1",
                {
                  "border-red-500": errors.reason,
                }
              )}
            />
            {errors.reason && (
              <p className="text-red-500 text-xs mt-1">
                {errors.reason.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Diagnostico
            </label>
            <input
              {...register("diagnosis")}
              className={clsx(
                "w-full rounded-md border border-gray-200 p-2 text-congress-950",
                {
                  "border-red-500": errors.diagnosis,
                }
              )}
            />
            {errors.diagnosis && (
              <p className="text-red-500 text-xs mt-1">
                {errors.diagnosis.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Receta
            </label>
            <textarea
              {...register("prescription")}
              className={clsx(
                "w-full rounded-md border border-gray-200 p-2 text-congress-950 mt-1",
                {
                  "border-red-500": errors.prescription,
                }
              )}
            ></textarea>
            {errors.prescription && (
              <p className="text-red-500 text-xs mt-1">
                {errors.prescription.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-slate-900 text-white px-4 py-2 rounded-md w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Registrar vacuna"}
          </button>
        </form>
      </div>
    </section>
  );
}
