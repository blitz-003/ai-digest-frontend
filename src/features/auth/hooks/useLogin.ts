import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";

import { useRouter } from "next/navigation";

import { login } from "../services/auth.service";
import { toast } from "sonner";
import axios from "axios";


export const useLogin = () => {


const queryClient = useQueryClient();

const router = useRouter();



return useMutation({
  mutationFn: login,

  onSuccess: async () => {
    await queryClient.refetchQueries({
      queryKey: ["current-user"],
    });

    toast.success("Login successful");

    router.push("/");
  },

  onError: (error) => {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.detail ||
        "Invalid email or password"
      );
    } else {
      toast.error("Something went wrong");
    }
  },
});


};