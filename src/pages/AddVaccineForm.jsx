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
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  comments: yup.string(),
  appliedBy: yup
    .string()
    .required("Applied By is required")
    .min(2, "Applied By must be at least 2 characters"),
  petId: yup.string().required("Pet ID is required"),
  vet: yup.string().required("Vet is required"),
});

export default function AddVaccineForm({ onClose, onVaccineAdded, petId }) {
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
      petId,
    };
    console.log("Form data:", formattedData);
    try {
      const vaccine = await createVaccine(formattedData);
      console.log("Vaccine created:", vaccine);
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
        <h2 className="text-congress-950 text-2xl text-center mb-4">
          Agregar Vacuna
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <label className="w-full text-left text-congress-950">Name</label>
          <input
            {...register("name")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.name,
              }
            )}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <label className="w-full text-left text-congress-950">Comments</label>
          <input
            {...register("comments")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950"
            )}
          />

          <label className="w-full text-left text-congress-950">
            Applied By
          </label>
          <input
            {...register("appliedBy")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.appliedBy,
              }
            )}
          />
          {errors.appliedBy && (
            <span className="text-red-500">{errors.appliedBy.message}</span>
          )}

          <label className="w-full text-left text-congress-950">Vet</label>
          <input
            {...register("vet")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.vet,
              }
            )}
          />
          {errors.vet && (
            <span className="text-red-500">{errors.vet.message}</span>
          )}

          <div className="flex justify-end">
            <PrimaryButton type="submit" loading={loading}>
              Agregar Vacuna
            </PrimaryButton>
          </div>
        </form>
      </div>
    </section>
  );
}
