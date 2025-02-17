import clsx from "clsx";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "sonner";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import PrimaryButton from "@/components/PrimaryButton";
import ImageUploader from "@/components/ImageUploader";
import { updateUser } from "@/pages/api/services/users/User";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  lastName: yup.string().required("Last name is required"),
  birthday: yup.date().required("Birthday is required"),
  phone: yup.string().required("Phone is required"),
  profilePic: yup.string().required("Profile picture URL is required"),
  oldPassword: yup.string().required("Current password is required"),
  password: yup
    .string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
});

export default function EditUserForm({ handleModal, user = {}, setUser }) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name || "",
      lastName: user.lastName || "",
      birthday: user.birthday
        ? new Date(user.birthday).toISOString().split("T")[0]
        : "",
      phone: user.phone || "",
      profilePic: user.profilePic || "",
      oldPassword: "",
      password: "",
    },
  });

  const handleImageUpload = (url) => {
    setValue("profilePic", url);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await updateUser(user.id, data);
      toast.success("User updated successfully");
      setLoading(false);
      handleModal();
      setUser({ ...user, ...data });
    } catch (error) {
      setLoading(false);
      toast.error(`Error updating user: ${error.message}`);
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-96 relative">
        <button onClick={handleModal} className="absolute top-2 right-2">
          <MdClose className="text-2xl m-auto text-congress-950" />
        </button>
        <h2 className="text-congress-950 text-2xl text-center mb-4">
          Edit User Data
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4 mt-4"
        >
          <label className="w-full text-left text-congress-950">Name</label>
          <input
            type="text"
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

          <label className="w-full text-left text-congress-950">
            Last Name
          </label>
          <input
            type="text"
            {...register("lastName")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.lastName,
              }
            )}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}

          <label className="w-full text-left text-congress-950">Birthday</label>
          <input
            type="date"
            {...register("birthday")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.birthday,
              }
            )}
          />
          {errors.birthday && (
            <span className="text-red-500">{errors.birthday.message}</span>
          )}

          <label className="w-full text-left text-congress-950">Phone</label>
          <input
            type="text"
            {...register("phone")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.phone,
              }
            )}
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}

          <label className="w-full text-left text-congress-950">
            Profile Picture
          </label>
          <ImageUploader onUpload={handleImageUpload} />
          {errors.profilePic && (
            <span className="text-red-500">{errors.profilePic.message}</span>
          )}

          <label className="w-full text-left text-congress-950">
            Current Password
          </label>
          <input
            type="password"
            {...register("oldPassword")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.oldPassword,
              }
            )}
          />
          {errors.oldPassword && (
            <span className="text-red-500">{errors.oldPassword.message}</span>
          )}

          <label className="w-full text-left text-congress-950">
            New Password
          </label>
          <input
            type="password"
            {...register("password")}
            className={clsx(
              "w-full rounded-md border border-gray-200 p-2 text-congress-950",
              {
                "border-red-500": errors.password,
              }
            )}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <PrimaryButton label="Update User Data" isSubmitting={loading} />
        </form>
      </div>
    </section>
  );
}
