import { useForm } from "react-hook-form";
import { registerUser } from "../services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("user_type_id", 1);
    formData.append("name", data.name);
    formData.append("mobile", data.mobile);
    formData.append("email", data.email);
    formData.append("company_name", data.company_name);
    formData.append("firebase_token", "test-token-123");
    formData.append("installation_id", "test-install-123");
    formData.append("login_via", "ANDROID");
    formData.append("gst_no", data.gst_no);
    formData.append("pan_no", data.pan_no);
    formData.append("location_id", data.location_id);
    formData.append("profile_image", data.profile_image[0]);

    await registerUser(formData);
    alert("Registered Successfully");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Full Name */}
        <div>
          <Input {...register("name", { required: true })} placeholder="Full Name" />
          {errors.name && <p className="text-red-500 text-sm">Name required</p>}
        </div>

        {/* Mobile + Email */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input {...register("mobile", { required: true })} placeholder="Mobile" />
            {errors.mobile && <p className="text-red-500 text-sm">Required</p>}
          </div>

          <div>
            <Input {...register("email", { required: true })} placeholder="Email" />
            {errors.email && <p className="text-red-500 text-sm">Required</p>}
          </div>
        </div>

        {/* Company */}
        <div>
          <Input {...register("company_name", { required: true })} placeholder="Company Name" />
          {errors.company_name && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* GST + PAN */}
        <div className="grid grid-cols-2 gap-3">
          <Input {...register("gst_no")} placeholder="GST No" />
          <Input {...register("pan_no")} placeholder="PAN No" />
        </div>

        {/* Location */}
        <Input {...register("location_id")} placeholder="Location ID" />

        {/* File Upload */}
        <div>
          <input
            type="file"
            className="w-full border rounded-md p-2"
            {...register("profile_image", { required: true })}
          />
          {errors.profile_image && (
            <p className="text-red-500 text-sm">Image required</p>
          )}
        </div>

        {/* Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </Button>

      </form>
    </div>
  );
}