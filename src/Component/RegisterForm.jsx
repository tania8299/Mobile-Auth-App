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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

      <Input {...register("name", { required: true })} placeholder="Full Name" />
      {errors.name && <p className="text-red-500">Name required</p>}

      <Input {...register("mobile", { required: true })} placeholder="Mobile" />
      {errors.mobile && <p className="text-red-500">Mobile required</p>}

      <Input {...register("email", { required: true })} placeholder="Email" />
      {errors.email && <p className="text-red-500">Email required</p>}

      <Input {...register("company_name", { required: true })} placeholder="Company Name" />
      {errors.company_name && <p className="text-red-500">Required</p>}

      <Input {...register("gst_no")} placeholder="GST No" />
      <Input {...register("pan_no")} placeholder="PAN No" />
      <Input {...register("location_id")} placeholder="Location ID" />

      <input
        type="file"
        {...register("profile_image", { required: true })}
      />
      {errors.profile_image && <p className="text-red-500">Image required</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}