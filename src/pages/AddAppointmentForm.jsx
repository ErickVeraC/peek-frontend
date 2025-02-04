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
    const formattedData = {
      ...data,
      date: new Date(data.date).toISOString(),
      hour: data.hour,
      petId,
    };
    console.log("Form data:", formattedData);
    try {
      const appointment = await createAppointment(formattedData);
      console.log("Appointment created:", appointment);
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
          <MdClose className="text-2xl m-auto text-congress-950" />
        </button>
        <h2 className="text-congress-950 text-2xl text-center mb-4">
          Agrega tu cita
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <label className="w-full text-left text-congress-950">Date</label>
          <input
            type="date"
            {...register("date")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.date,
              }
            )}
          />
          {errors.date && (
            <span className="text-red-500">{errors.date.message}</span>
          )}

          <label className="w-full text-left text-congress-950">Hour</label>
          <input
            type="time"
            {...register("hour")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.hour,
              }
            )}
          />
          {errors.hour && (
            <span className="text-red-500">{errors.hour.message}</span>
          )}

          <label className="w-full text-left text-congress-950">Reason</label>
          <input
            type="text"
            {...register("reason")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.reason,
              }
            )}
          />
          {errors.reason && (
            <span className="text-red-500">{errors.reason.message}</span>
          )}

          <div className="flex justify-end">
            <PrimaryButton type="submit" loading={loading}>
              {loading ? "Creating..." : "Create Appointment"}
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
