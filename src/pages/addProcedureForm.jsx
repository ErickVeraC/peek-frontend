import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createVaccine } from "@/pages/api/services/petsFile/vaccinesService";
import * as yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import PrimaryButton from "@/components/PrimaryButton";

const schema = yup.object().shape({
  reason: yup
    .string()
    .required("Razón o motivo requerido")
    .min(2, "Name must be at least 2 characters"),
  diagnosis: yup.string().required("Diagnostico requerido"),
});

export default function AddProcedureForm({ onClose, onVaccineAdded }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    alert("Agregar función de registrar vacuna");
    setLoading(true);
    /* try {
      await createVaccine(data);
      toast.success("Vacuna creada con éxito");
      if (typeof onVaccineAdded === "function") {
        onVaccineAdded();
      }
      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      toast.error(`Error creando vacuna: ${error.message}`);
    } finally {
      setLoading(false);
    }*/
  };

  return (
    <section
      className={clsx(
        "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      )}
    >
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <MdClose size={24} />
        </button>
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
                  "border-red-500": errors.date,
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
