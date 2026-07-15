import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { register } from "../services/auth.service";
import { useRouter } from "next/navigation";

export const useRegister = () => {

  const router = useRouter();

  return useMutation({

    mutationFn: register,

    onSuccess: () => {

      toast.success("Registration successful");

      router.push("/login");

    },

onError: (error) => {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;

    if (typeof detail === "string") {
      toast.error(detail);
    } else if (Array.isArray(detail)) {
      toast.error(detail[0]?.msg ?? "Registration failed");
    } else {
      toast.error("Registration failed");
    }
  } else {
    toast.error("Something went wrong");
  }
},

  });

};