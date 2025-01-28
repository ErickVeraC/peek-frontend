import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAppointment } from "@/pages/api/services/petsFile/appointmentService";
import * as yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import PrimaryButton from "@/components/PrimaryButton";

const schema = yup.object().shape({
  date: yup.date().required("Date is required"),
  hour: yup.string().required("Hour is required"),
  reason: yup.string().required("Reason is required"),
  vetId: yup.string().required("Vet ID is required"),
});

export default function AddAppointmentForm({
  onClose,
  onAppointmentAdded,
  petId,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await createAppointment({ ...data, petId });
      toast.success("Cita creada con éxito");
      if (typeof onAppointmentAdded === "function") {
        onAppointmentAdded();
      }
      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      toast.error(`Error creando cita: ${error.message}`);
    } finally {
      setLoading(false);
    }
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
              Date
            </label>
            <input
              type="date"
              {...register("date")}
              className="mt-1 block w-full"
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Hour
            </label>
            <input {...register("hour")} className="mt-1 block w-full" />
            {errors.hour && (
              <p className="text-red-500 text-xs mt-1">{errors.hour.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <input {...register("reason")} className="mt-1 block w-full" />
            {errors.reason && (
              <p className="text-red-500 text-xs mt-1">
                {errors.reason.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Vet ID
            </label>
            <input {...register("vetId")} className="mt-1 block w-full" />
            {errors.vetId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.vetId.message}
              </p>
            )}
          </div>
          <PrimaryButton type="submit" loading={loading}>
            Agregar Cita
          </PrimaryButton>
        </form>
      </div>
    </section>
  );
}
