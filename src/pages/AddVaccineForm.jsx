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

export default function AddVaccineForm({ onClose, onVaccineAdded }) {
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
              Name
            </label>
            <input {...register("name")} className="mt-1 block w-full" />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Comments
            </label>
            <input {...register("comments")} className="mt-1 block w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Applied By
            </label>
            <input {...register("appliedBy")} className="mt-1 block w-full" />
            {errors.appliedBy && (
              <p className="text-red-500 text-xs mt-1">
                {errors.appliedBy.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Pet ID
            </label>
            <input {...register("petId")} className="mt-1 block w-full" />
            {errors.petId && (
              <p className="text-red-500 text-xs mt-1">
                {errors.petId.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Vet
            </label>
            <input {...register("vet")} className="mt-1 block w-full" />
            {errors.vet && (
              <p className="text-red-500 text-xs mt-1">{errors.vet.message}</p>
            )}
          </div>
          <PrimaryButton type="submit" loading={loading}>
            Agregar Vacuna
          </PrimaryButton>
        </form>
      </div>
    </section>
  );
}
